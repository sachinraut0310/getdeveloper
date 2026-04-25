# 📋 Form Setup Guide — Email + Google Sheet

## Overview
Jab bhi koi form bhare → Aapko **email notification** aayega + **Google Sheet** mein data save hoga.

---

## PART 1 — EmailJS Setup (10 min)

### Step 1: Account banao
1. Jao → https://www.emailjs.com
2. "Sign Up Free" karo (Gmail se login kar sakte ho)

### Step 2: Email Service connect karo
1. Dashboard mein "Email Services" → "Add New Service"
2. **Gmail** select karo
3. Apna Gmail account connect karo
4. **Service ID** copy karo (e.g. `service_abc123`) ← yeh chahiye

### Step 3: Email Template banao
1. "Email Templates" → "Create New Template"
2. Template mein yeh content daalo:

**Subject:**
```
🔔 New Lead: {{from_name}} — {{services}}
```

**Body:**
```
New lead received on your website!

Name:     {{from_name}}
Email:    {{from_email}}
Phone:    {{from_phone}}
Service:  {{services}}
Website:  {{website}}
Message:  {{message}}
Time:     {{timestamp}}
Source:   {{source}}

Reply directly to: {{reply_to}}
```

3. "To Email" mein apna email daalo (hello@sachinraut.com)
4. Save karo
5. **Template ID** copy karo (e.g. `template_xyz789`) ← yeh chahiye

### Step 4: Public Key lao
1. Dashboard → "Account" → "General"
2. **Public Key** copy karo (e.g. `aBcDeFgHiJ`) ← yeh chahiye

---

## PART 2 — Google Sheet Setup (5 min)

### Step 1: Google Sheet banao
1. Jao → https://sheets.google.com
2. New sheet banao, naam do: **"Leads — Sachin Raut"**
3. Row 1 mein yeh headers daalo (exactly):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Service | Website | Message | Source |

### Step 2: Apps Script banao
1. Sheet mein jao → **Extensions → Apps Script**
2. Jo code hai woh delete karo, yeh paste karo:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.service,
      data.website,
      data.message,
      data.source
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save karo (Ctrl+S), project naam do koi bhi

### Step 3: Deploy karo
1. "Deploy" button → "New Deployment"
2. Type: **"Web app"** select karo
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. "Deploy" karo
5. **Web app URL** copy karo (e.g. `https://script.google.com/macros/s/ABC.../exec`) ← yeh chahiye

---

## PART 3 — Website mein daalo (2 min)

`index.html` file open karo, yeh section dhundo (top mein hai):

```javascript
const CONFIG = {
  EMAILJS_PUBLIC_KEY:  'YOUR_PUBLIC_KEY',
  EMAILJS_SERVICE_ID:  'YOUR_SERVICE_ID',
  EMAILJS_TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  GOOGLE_SHEET_URL:    'YOUR_GOOGLE_APPS_SCRIPT_URL'
};
```

Aur replace karo apni values se:

```javascript
const CONFIG = {
  EMAILJS_PUBLIC_KEY:  'aBcDeFgHiJ',           // ← aapka Public Key
  EMAILJS_SERVICE_ID:  'service_abc123',        // ← aapka Service ID
  EMAILJS_TEMPLATE_ID: 'template_xyz789',       // ← aapka Template ID
  GOOGLE_SHEET_URL:    'https://script.google.com/macros/s/.../exec'  // ← aapka URL
};
```

---

## ✅ Test karo

1. Website open karo
2. Form bharo (test name/email use karo)
3. Submit karo
4. Check karo:
   - 📧 Aapke email pe notification aayi?
   - 📊 Google Sheet mein row add hui?

---

## 💡 Tips

- EmailJS free plan: **200 emails/month** (enough for starting out)
- Google Sheets: **Unlimited rows**, free
- Dono form (Hero + Contact Section) — dono se data save hoga, "Source" column se pata chalega kahan se aaya
- Sheet mein "Source" = "Hero Section" ya "Contact Section" hoga

---

*Setup mein koi problem ho toh batao! 🙌*
