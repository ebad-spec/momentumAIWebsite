# Supabase + Momentum-AI Session Handoff

When a user completes sign-up and payment on the Replit app, they are created in the **same Supabase project** as Momentum-AI and redirected to Momentum-AI with a one-time code so they land already signed in.

## Replit backend env vars (server only)

Add to `.env` (never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend):

```bash
# Same Supabase project as Momentum-AI
SUPABASE_SERVICE_ROLE_KEY=<from Supabase Dashboard → Settings → API>
SUPABASE_ANON_KEY=<anon key from same project>
# Base URL of the Momentum-AI app (AWS)
MOMENTUM_AI_APP_BASE_URL=https://your-domain.com
```

## Flow

1. **Sign-up** (`/api/verify-code-and-register`): After creating the Replit user, the backend creates a Supabase user (same email/password) via Admin API and obtains a session. The `refresh_token` is stored in `users.supabase_refresh_token`.
2. **Payment success**: The user stays on the Replit success page (no automatic redirect).
3. **When the user clicks "Access our Beta" or "Launch Platform"**: The frontend calls `GET /api/momentum-launch` (auth + active subscription required). The backend refreshes the Supabase session, creates a **one-time code** (TTL 5 min), and returns `redirectUrl`:  
   `https://<MOMENTUM_AI_APP_BASE_URL>/auth/callback?code=<ONE_TIME_CODE>`  
   The frontend redirects the user to this URL so they land on Momentum-AI already signed in (no Supabase login page).
4. **Momentum-AI** must implement `/auth/callback` to:
   - Read `code` from the query string.
   - Call the Replit backend to exchange the code for tokens:  
     `GET https://<REPLIT_APP_URL>/api/auth/momentum-exchange?code=<CODE>`  
     Response: `{ "access_token": "...", "refresh_token": "..." }`
   - Call `supabase.auth.setSession({ access_token, refresh_token })`.
   - Redirect the user into the app (e.g. `/` or dashboard).

## Replit API for Momentum-AI

- **Exchange one-time code for tokens**  
  `GET /api/auth/momentum-exchange?code=<ONE_TIME_CODE>`  
  Returns `{ access_token, refresh_token }` and invalidates the code.  
  Use 404 if the code is missing, invalid, or expired.

## Notes

- One-time codes expire after 5 minutes.
- If Supabase env vars are not set, sign-up and payment still work; redirect with session handoff is skipped and the user sees the normal success page with “Launch Platform”.
- Existing users (created before this flow) have no `supabase_refresh_token`; they will not get an automatic redirect with session. They can still use “Launch Platform” and sign in on Momentum-AI with the same email/password if they were later synced or sign up there.
