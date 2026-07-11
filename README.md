# AdLens MVP

AI destekli reklam bütçesi stratejisi üreten ilk çalışan MVP iskeleti.

## 1) Backend'i çalıştır

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend:
- http://localhost:8000
- API dokümantasyonu: http://localhost:8000/docs

## 2) Frontend'i çalıştır

Yeni terminal aç:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
- http://localhost:3000

## İlk test

Formu doldurup **Generate Strategy** butonuna bas.
Frontend, FastAPI backend'ine istek gönderir ve örnek bir reklam stratejisi gösterir.

## Sonraki adım

Backend'deki kural tabanlı örnek sonucu OpenAI API ile güçlendireceğiz.
