# Dietly

Günlük bazal metabolizma hızı (BMR), toplam enerji harcaması (TDEE) ve vücut ağırlığına endeksli hidrasyon hedeflerini hesaplayan; gün bazlı öğün ve su tüketimini takip etmeyi sağlayan minimalist sağlık ve beslenme takip paneli.

## Özellikler

- **Dinamik Hedef Hesaplama:** Mifflin-St Jeor denklemi ile kişisel kalori limiti ve kilo/aktivite katsayısına göre günlük su hedefi (ml).
- **Tarih Bazlı Veri Saklama:** `localStorage` üzerinde `YYYY-MM-DD` anahtarlarıyla izole günlük kayıtlar ve geçmiş günler arasında geçiş.
- **Hızlı Etkileşim:** Tek tıkla su ekleme/çıkarma (`+200ml`, `+330ml`, `+500ml`), öğün bazlı kalori kaydı ve hazır sık tüketilen besin kısayolları.
- **Tema Desteği:** Sistem tercihine uyumlu veya manuel değiştirilebilir Koyu / Açık arayüz.

## Teknoloji Yığını

- **Framework:** React 18 + Vite
- **Dil:** TypeScript (Strict Mode)
- **Stil:** Tailwind CSS
- **İkonlar:** Lucide React

## Kurulum

```bash
git clone https://github.com/mertgoktass/dietly.git
cd dietly
npm install
npm run dev
```
