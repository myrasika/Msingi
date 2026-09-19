# Msingi

Msingi is a Kenyan civic information MVP: browse verified situations, search for relevant guidance, read plain-language explanations, view legal sources, save situations, and read guidance aloud.

## Prerequisites

- Node.js 20 or newer
- PostgreSQL 14 or newer
- Expo Go on a physical device, or an iOS/Android simulator

## Install

From the repository root:

```sh
npm install
cp apps/api/.env.example apps/api/.env
```

Update `apps/api/.env` so `DATABASE_URL` points to a local PostgreSQL database named `msingi_dev`.

Initialize and seed the database:

```sh
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
```

## Run locally

Start the API in one terminal:

```sh
npm run api
```

The API runs at `http://localhost:3000`. Check it with:

```sh
curl http://localhost:3000/api/health
```

Start Expo in a second terminal:

```sh
npm run mobile
```

Then press `i` for the iOS simulator, `a` for an Android emulator, or scan the QR code with Expo Go. For a physical Android device, set `EXPO_PUBLIC_API_URL` to your computer's LAN address, for example `http://192.168.1.20:3000`, before starting Expo. iOS simulator uses `http://localhost:3000` by default; Android emulator uses `http://10.0.2.2:3000`.

## Validate

```sh
npm run build:api
cd apps/mobile
npx tsc --noEmit
npx expo export --platform ios --output-dir dist
npx expo export --platform android --output-dir dist-android
```

