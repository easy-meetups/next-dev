import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendWelcomeEmail } from '@/utils/sendEmail';

const DATA_FOLDER = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_FOLDER, 'subscribers.json');

interface Subscriber {
  email: string;
  subscribedAt: string;
}

function ensureDataFileExists() {
  if (!fs.existsSync(DATA_FOLDER)) {
    fs.mkdirSync(DATA_FOLDER);
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

function readSubscribers(): Subscriber[] {
  ensureDataFileExists();
  const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    return JSON.parse(fileContents) as Subscriber[];
  } catch {
    return [];
  }
}

function writeSubscribers(subscribers: Subscriber[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    const subscribers = readSubscribers();

    const alreadySubscribed = subscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadySubscribed) {
      return NextResponse.json(
        { error: 'E-mail já cadastrado' },
        { status: 409 }
      );
    }

    const newSubscriber: Subscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    writeSubscribers(subscribers);

    // Envia e-mail de boas-vindas (não bloqueia a resposta)
    sendWelcomeEmail(newSubscriber.email).catch((err) => {
      console.error('Erro ao enviar e-mail de boas-vindas:', err);
    });

    return NextResponse.json(
      { message: 'Inscrição realizada com sucesso' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro na inscrição:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
