import { Subscribe } from "../../services/notificationService";

export async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const registration = await navigator.serviceWorker.register('/sw.js');
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BKSjQ6q1i1V5QmHKw10MhF2TXk5-HB1H9Zde_6Fi0GLWKs3uR67p2h91AElmuFIjoewuWBlhg9HNet4ml1A0obw'),
    });
    // Send subscription to backend
    Subscribe({body: JSON.stringify(subscription)});
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}