'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

// Componente de controle Toggle
const ToggleSwitch: React.FC<{
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}> = ({ id, label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <label htmlFor={id} className="text-gray-800 font-medium cursor-pointer">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
    <div className="relative inline-block w-12 mr-2 align-middle select-none">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'transform translate-x-6' : 'transform translate-x-0'
          }`}
        />
      </label>
    </div>
  </div>
);

// Componente de card de configuração
const SettingsCard: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ title, description, children, actions }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {actions}
    </div>
    <div className="divide-y divide-gray-200">{children}</div>
  </div>
);

export default function SettingsPage() {
  const { user } = useUser();
  
  // Estado para as diferentes categorias de configurações
  const [accountSettings, setAccountSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
    allowMultipleSessions: true,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    marketingEmails: false,
    newEventsNotification: true,
    communityMessages: true,
    eventUpdates: true,
    desktopNotifications: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showAttendance: true,
    shareInterests: true,
    allowTagging: false,
    dataCollection: true,
    allowEventOrganizers: true,
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    reduceAnimations: false,
    highContrast: false,
    compactView: false,
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    googleCalendar: false,
    outlookCalendar: false,
    slack: false,
    github: true,
  });
  
  // Funções para atualizar configurações
  const updateAccountSetting = (key: keyof typeof accountSettings, value: any) => {
    setAccountSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const updateNotificationSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const updatePrivacySetting = (key: keyof typeof privacySettings, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [key]: typeof value === 'boolean' ? !prev[key] : value }));
  };
  
  const updateAppearanceSetting = (key: keyof typeof appearanceSettings, value: any) => {
    setAppearanceSettings(prev => ({ ...prev, [key]: typeof value === 'boolean' ? !prev[key] : value }));
  };
  
  const updateIntegrationSetting = (key: keyof typeof integrationSettings) => {
    setIntegrationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Função para salvar todas as configurações
  const saveSettings = () => {
    // Simulação de salvamento - em uma aplicação real, isso enviaria dados para a API
    console.log({
      accountSettings,
      notificationSettings,
      privacySettings,
      appearanceSettings,
      integrationSettings,
    });
    
    // Feedback visual de sucesso
    alert('Configurações salvas com sucesso!');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando configurações...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Configurações da Conta</h1>
          <p className="text-blue-100 mt-2">
            Personalize sua experiência na plataforma de eventos
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Navegação lateral */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-20">
              <nav className="space-y-1">
                <a href="#account" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Conta
                </a>
                <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notificações
                </a>
                <a href="#privacy" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacidade
                </a>
                <a href="#appearance" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Aparência
                </a>
                <a href="#integrations" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Integrações
                </a>
                <a href="#data" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  Dados e Armazenamento
                </a>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={saveSettings}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="col-span-12 lg:col-span-9">
            {/* Configurações de Conta */}
            <section id="account">
              <h2 className="text-2xl font-bold mb-4">Configurações de Conta</h2>
              
              <SettingsCard
                title="Informações Pessoais"
                description="Atualize seus dados de perfil e informações de contato"
              >
                <div className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        O e-mail não pode ser alterado diretamente. Entre em contato com o suporte.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa/Organização
                      </label>
                      <input
                        type="text"
                        placeholder="Nome da sua empresa"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </SettingsCard>
              
              <SettingsCard
                title="Segurança da Conta"
                description="Gerencie opções de segurança e acesso à sua conta"
              >
                <ToggleSwitch
                  id="two-factor-auth"
                  label="Autenticação de dois fatores"
                  description="Aumente a segurança da sua conta exigindo um segundo método de verificação ao fazer login"
                  checked={accountSettings.twoFactorAuth}
                  onChange={() => updateAccountSetting('twoFactorAuth', !accountSettings.twoFactorAuth)}
                />
                
                <div className="py-3">
                  <label htmlFor="session-timeout" className="text-gray-800 font-medium">
                    Tempo limite da sessão
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Define quanto tempo você permanecerá conectado sem atividade
                  </p>
                  <select
                    id="session-timeout"
                    value={accountSettings.sessionTimeout}
                    onChange={(e) => updateAccountSetting('sessionTimeout', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="120">2 horas</option>
                    <option value="240">4 horas</option>
                    <option value="480">8 horas</option>
                  </select>
                </div>
                
                <ToggleSwitch
                  id="login-alerts"
                  label="Alertas de login"
                  description="Receba notificações quando houver um novo login na sua conta"
                  checked={accountSettings.loginAlerts}
                  onChange={() => updateAccountSetting('loginAlerts', !accountSettings.loginAlerts)}
                />
                
                <ToggleSwitch
                  id="multiple-sessions"
                  label="Permitir múltiplas sessões"
                  description="Permita acessar sua conta de múltiplos dispositivos simultaneamente"
                  checked={accountSettings.allowMultipleSessions}
                  onChange={() => updateAccountSetting('allowMultipleSessions', !accountSettings.allowMultipleSessions)}
                />
                
                <div className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Alterar senha
                  </button>
                </div>
              </SettingsCard>
            </section>
            
            {/* Configurações de Notificações */}
            <section id="notifications" className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Configurações de Notificações</h2>
              
              <SettingsCard
                title="Preferências de E-mail"
                description="Gerencie quais e-mails você deseja receber"
              >
                <ToggleSwitch
                  id="email-notifications"
                  label="Notificações por e-mail"
                  description="Receba atualizações importantes sobre eventos e sua conta"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => updateNotificationSetting('emailNotifications')}
                />
                
                <ToggleSwitch
                  id="event-reminders"
                  label="Lembretes de eventos"
                  description="Receba lembretes sobre eventos que você se inscreveu"
                  checked={notificationSettings.eventReminders}
                  onChange={() => updateNotificationSetting('eventReminders')}
                />
                
                <ToggleSwitch
                  id="marketing-emails"
                  label="E-mails de marketing"
                  description="Receba promoções, ofertas e novidades da plataforma"
                  checked={notificationSettings.marketingEmails}
                  onChange={() => updateNotificationSetting('marketingEmails')}
                />
                
                <ToggleSwitch
                  id="new-events-notification"
                  label="Novos eventos de interesse"
                  description="Seja notificado quando novos eventos que correspondam aos seus interesses forem criados"
                  checked={notificationSettings.newEventsNotification}
                  onChange={() => updateNotificationSetting('newEventsNotification')}
                />
                
                <ToggleSwitch
                  id="community-messages"
                  label="Mensagens da comunidade"
                  description="Receba notificações sobre discussões e mensagens de outros participantes"
                  checked={notificationSettings.communityMessages}
                  onChange={() => updateNotificationSetting('communityMessages')}
                />
                
                <ToggleSwitch
                  id="event-updates"
                  label="Atualizações de eventos"
                  description="Receba notificações quando houver alterações em eventos que você se inscreveu"
                  checked={notificationSettings.eventUpdates}
                  onChange={() => updateNotificationSetting('eventUpdates')}
                />
              </SettingsCard>
              
              <SettingsCard
                title="Notificações no Navegador"
                description="Configurações para notificações no desktop"
              >
                <ToggleSwitch
                  id="desktop-notifications"
                  label="Notificações no desktop"
                  description="Mostrar notificações no seu computador quando o navegador estiver aberto"
                  checked={notificationSettings.desktopNotifications}
                  onChange={() => updateNotificationSetting('desktopNotifications')}
                />
                
                <div className="py-3">
                  <button 
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    onClick={() => {
                      if ('Notification' in window) {
                        Notification.requestPermission();
                      }
                    }}
                  >
                    Solicitar permissão para notificações
                  </button>
                </div>
              </SettingsCard>
            </section>
            
            {/* Configurações de Privacidade */}
            <section id="privacy" className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Configurações de Privacidade</h2>
              
              <SettingsCard
                title="Visibilidade do Perfil"
                description="Controle quem pode ver suas informações e atividades"
              >
                <div className="py-3">
                  <label htmlFor="profile-visibility" className="text-gray-800 font-medium">
                    Visibilidade do perfil
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Define quem pode ver seu perfil na plataforma
                  </p>
                  <select
                    id="profile-visibility"
                    value={privacySettings.profileVisibility}
                    onChange={(e) => updatePrivacySetting('profileVisibility', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Público (visível para todos)</option>
                    <option value="registered">Apenas usuários registrados</option>
                    <option value="connections">Apenas conexões</option>
                    <option value="private">Privado (apenas você)</option>
                  </select>
                </div>
                
                <ToggleSwitch
                  id="show-attendance"
                  label="Mostrar participação em eventos"
                  description="Permitir que outros vejam quais eventos você participou ou irá participar"
                  checked={privacySettings.showAttendance}
                  onChange={() => updatePrivacySetting('showAttendance', null)}
                />
                
                <ToggleSwitch
                  id="share-interests"
                  label="Compartilhar interesses"
                  description="Permitir que seus interesses sejam visíveis para outros usuários"
                  checked={privacySettings.shareInterests}
                  onChange={() => updatePrivacySetting('shareInterests', null)}
                />
                
                <ToggleSwitch
                  id="allow-tagging"
                  label="Permitir marcações"
                  description="Permitir que outros usuários possam marcar você em publicações ou fotos"
                  checked={privacySettings.allowTagging}
                  onChange={() => updatePrivacySetting('allowTagging', null)}
                />
              </SettingsCard>
              
              <SettingsCard
                title="Dados e Compartilhamento"
                description="Gerencie como seus dados são usados na plataforma"
              >
                <ToggleSwitch
                  id="data-collection"
                  label="Coleta de dados de uso"
                  description="Permitir coleta de dados anônimos para melhorar a plataforma"
                  checked={privacySettings.dataCollection}
                  onChange={() => updatePrivacySetting('dataCollection', null)}
                />
                
                <ToggleSwitch
                  id="allow-event-organizers"
                  label="Compartilhar dados com organizadores"
                  description="Permitir que organizadores de eventos vejam suas informações quando você se inscreve"
                  checked={privacySettings.allowEventOrganizers}
                  onChange={() => updatePrivacySetting('allowEventOrganizers', null)}
                />
                
                <div className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Baixar seus dados
                  </button>
                </div>
                
                <div className="py-3">
                  <button className="text-red-600 hover:text-red-800 font-medium">
                    Solicitar exclusão de conta
                  </button>
                </div>
              </SettingsCard>
            </section>
            
            {/* Configurações de Aparência */}
            <section id="appearance" className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Configurações de Aparência</h2>
              
              <SettingsCard
                title="Personalização da Interface"
                description="Personalize a aparência da plataforma"
              >
                <div className="py-3">
                  <label htmlFor="theme-select" className="text-gray-800 font-medium">
                    Tema
                  </label>
                  <select
                    id="theme-select"
                    value={appearanceSettings.theme}
                    onChange={(e) => updateAppearanceSetting('theme', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="system">Usar configuração do sistema</option>
                  </select>
                </div>
                
                <div className="py-3">
                  <label htmlFor="font-size" className="text-gray-800 font-medium">
                    Tamanho da fonte
                  </label>
                  <select
                    id="font-size"
                    value={appearanceSettings.fontSize}
                    onChange={(e) => updateAppearanceSetting('fontSize', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                    <option value="x-large">Extra grande</option>
                  </select>
                </div>
                
                <ToggleSwitch
                  id="reduce-animations"
                  label="Reduzir animações"
                  description="Diminui ou remove efeitos de animação na interface"
                  checked={appearanceSettings.reduceAnimations}
                  onChange={() => updateAppearanceSetting('reduceAnimations', null)}
                />
                
                <ToggleSwitch
                  id="high-contrast"
                  label="Alto contraste"
                  description="Aumenta o contraste para melhor legibilidade"
                  checked={appearanceSettings.highContrast}
                  onChange={() => updateAppearanceSetting('highContrast', null)}
                />
                
                <ToggleSwitch
                  id="compact-view"
                  label="Visualização compacta"
                  description="Reduz o espaçamento entre elementos para mostrar mais conteúdo"
                  checked={appearanceSettings.compactView}
                  onChange={() => updateAppearanceSetting('compactView', null)}
                />
              </SettingsCard>
            </section>
            
            {/* Configurações de Integrações */}
            <section id="integrations" className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Integrações</h2>
              
              <SettingsCard
                title="Calendários"
                description="Sincronize eventos com seus calendários"
              >
                <ToggleSwitch
                  id="google-calendar"
                  label="Google Calendar"
                  description="Sincronizar eventos com seu Google Calendar"
                  checked={integrationSettings.googleCalendar}
                  onChange={() => updateIntegrationSetting('googleCalendar')}
                />
                
                <ToggleSwitch
                  id="outlook-calendar"
                  label="Microsoft Outlook"
                  description="Sincronizar eventos com seu calendário do Outlook"
                  checked={integrationSettings.outlookCalendar}
                  onChange={() => updateIntegrationSetting('outlookCalendar')}
                />
              </SettingsCard>
              
              <SettingsCard
                title="Outras Integrações"
                description="Conecte-se com outras plataformas"
              >
                <ToggleSwitch
                  id="slack-integration"
                  label="Slack"
                  description="Receba notificações de eventos no Slack"
                  checked={integrationSettings.slack}
                  onChange={() => updateIntegrationSetting('slack')}
                />
                
                <ToggleSwitch
                  id="github-integration"
                  label="GitHub"
                  description="Conecte sua conta do GitHub para compartilhar repositórios"
                  checked={integrationSettings.github}
                  onChange={() => updateIntegrationSetting('github')}
                />
                
                <div className="py-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                    Adicionar Nova Integração
                  </button>
                </div>
              </SettingsCard>
            </section>
            
            {/* Configurações de Dados */}
            <section id="data" className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Dados e Armazenamento</h2>
              
              <SettingsCard
                title="Gerenciamento de Dados"
                description="Controle seus dados pessoais na plataforma"
              >
                <div className="py-3">
                  <p className="text-gray-700 mb-2">
                    Você pode solicitar uma cópia de todos os seus dados pessoais armazenados em nossa plataforma.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                    Exportar Meus Dados
                  </button>
                </div>
                
                <div className="py-3 border-t">
                  <p className="text-gray-700 mb-2">
                    Visualize e gerencie todos os dispositivos onde sua conta está conectada atualmente.
                  </p>
                  <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                    Gerenciar Sessões Ativas
                  </button>
                </div>
                
                <div className="py-3 border-t">
                  <p className="text-gray-700 mb-2">
                    Limpe dados de navegação e cookies armazenados localmente neste dispositivo.
                  </p>
                  <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                    Limpar Dados Locais
                  </button>
                </div>
              </SettingsCard>
              
              <SettingsCard
                title="Exclusão de Conta"
                description="Opções para excluir permanentemente sua conta"
                actions={
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-50 hover:bg-red-100 py-1 px-3 rounded-md transition-colors">
                    Excluir Conta
                  </button>
                }
              >
                <div className="py-3">
                  <p className="text-gray-700 mb-4">
                    A exclusão da sua conta removerá permanentemente todos os seus dados pessoais, incluindo:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Seu perfil e informações pessoais</li>
                    <li>Histórico de participação em eventos</li>
                    <li>Mensagens e interações com outros usuários</li>
                    <li>Preferências e configurações da conta</li>
                  </ul>
                  <p className="mt-4 text-gray-700">
                    Esta ação não pode ser desfeita. Certifique-se de exportar seus dados antes de excluir sua conta.
                  </p>
                </div>
              </SettingsCard>
            </section>
            
            {/* Botão de salvar para telas pequenas */}
            <div className="mt-8 pt-4 border-t border-gray-200 lg:hidden">
              <button
                onClick={saveSettings}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                Salvar Todas as Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}