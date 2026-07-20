import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

async function test() {
  try {
    const localFilePath = path.resolve(process.cwd(), 'firebase-service-account.json');
    const serviceAccount = JSON.parse(fs.readFileSync(localFilePath, 'utf-8'));
    console.log('Loaded service account:', serviceAccount.project_id);

    const app = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id
    });

    const db = getFirestore(app);
    console.log('Attempting to fetch quote_requests...');
    const snapshot = await db.collection('quote_requests').get();
    console.log('Success! Number of docs:', snapshot.size);
    snapshot.forEach(doc => {
      console.log('Doc:', doc.id, doc.data());
    });
  } catch (err: any) {
    console.error('FAIL:', err);
  }
}

test();
