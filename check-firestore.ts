import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

async function test() {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'firebase-service-account.json'), 'utf-8'));
    const app = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
    const db = getFirestore(app);
    const doc = await db.collection('admin_settings').doc('auth').get();
    console.log('admin_settings/auth exists?', doc.exists);
    if (doc.exists) {
      console.log('Data:', doc.data());
    } else {
      console.log('No document found.');
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
