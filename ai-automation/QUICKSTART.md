# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Anthropic API Key
1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key

### Step 3: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Step 4: Run the Application
```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 📝 Example Workflow to Try

**Business Name:** TechSupply Co  
**Industry:** E-commerce  
**Tools Used:** WhatsApp, Google Sheets, Email, Stripe  
**Number of Employees:** 10  
**Daily Transactions:** 50  
**Hourly Rate:** 50  

**Workflow Description:**
```
Customer sends order via WhatsApp → We manually copy details to Google Sheets → 
Create invoice in Excel → Email invoice to customer → Process payment through 
Stripe → Update inventory in spreadsheet → Send confirmation email → 
Update order status
```

## ✅ What You'll Get

1. **Automation Score** (0-100) - How automatable your workflow is
2. **ROI Analysis** - Time and money saved
3. **n8n Workflow JSON** - Ready to import
4. **Implementation Guide** - Step-by-step documentation

## 🔧 Importing to n8n

1. Install n8n globally:
   ```bash
   npm install -g n8n
   ```

2. Start n8n:
   ```bash
   n8n start
   ```

3. Open n8n at http://localhost:5678

4. Click "Import from File"

5. Select your downloaded n8n-workflow.json

6. Configure node parameters

7. Activate workflow!

## 🎯 Features to Explore

- **Overview Tab**: See triggers, actions, and tools
- **Workflow Tab**: Visual workflow diagram
- **ROI Tab**: Detailed savings metrics
- **Download Buttons**: Get workflow JSON and docs

## 🐛 Troubleshooting

**"Analysis failed"**
- Check your API key in .env.local
- Ensure you have internet connection
- Verify Anthropic API has credits

**"Workflow not rendering"**
- Clear browser cache
- Refresh the page
- Check browser console for errors

**"Can't import to n8n"**
- Ensure n8n is running
- Check JSON file is valid
- Try reimporting the workflow

## 📚 Next Steps

1. ✅ Test with your own workflow
2. ✅ Download and import to n8n
3. ✅ Customize the automation
4. ✅ Deploy to production
5. ✅ Monitor results

## 💡 Tips

- Be specific in workflow descriptions
- Include all tools you currently use
- Provide accurate employee/transaction numbers
- Test workflows before production deployment

---

**Need Help?** Open an issue on GitHub or check the main README.md
