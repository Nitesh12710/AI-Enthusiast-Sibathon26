# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐│
│  │ Business Input  │  │  Results Page   │  │ Workflow    ││
│  │     Form        │→ │  with Tabs      │→ │  Visualizer ││
│  └─────────────────┘  └─────────────────┘  └─────────────┘│
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (Next.js)                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐│
│  │  /api/analyze   │  │ /api/generate   │  │   Future    ││
│  │   (Claude)      │  │     -pdf        │  │   Routes    ││
│  └────────┬────────┘  └─────────────────┘  └─────────────┘│
└───────────┼──────────────────────────────────────────────────┘
            │
            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Claude API (Anthropic)                    │
│        Analyzes workflow → Detects automation               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Business Logic Layer (lib/)                    │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ n8n-generator   │  │ roi-calculator  │                  │
│  │  (Templates)    │  │   (Metrics)     │                  │
│  └─────────────────┘  └─────────────────┘                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                     Output Files                            │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ n8n-workflow    │  │ Documentation   │                  │
│  │     .json       │  │     .txt        │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User Input** → Business details and workflow description
2. **API Call** → POST to /api/analyze
3. **Claude Analysis** → AI processes workflow and returns structured JSON
4. **Template Mapping** → n8n-generator maps to workflow templates
5. **ROI Calculation** → Computes savings and metrics
6. **Response** → Returns analysis, workflow, and ROI to frontend
7. **Visualization** → React Flow renders workflow diagram
8. **Download** → User gets n8n JSON and documentation

## Component Breakdown

### Frontend Components

**BusinessInputForm.tsx**
- Collects business information
- Validates input
- Sends to API

**ResultsPage.tsx**
- Displays automation score
- Shows tabbed interface
- Handles downloads

**WorkflowVisualization.tsx**
- Renders React Flow diagram
- Shows nodes and connections
- Interactive visualization

### API Routes

**api/analyze/route.ts**
- Receives form data
- Calls Claude API
- Orchestrates generation
- Returns results

**api/generate-pdf/route.ts**
- Formats documentation
- Returns downloadable file

### Business Logic

**lib/n8n-generator.ts**
- Template definitions
- Workflow mapping
- JSON generation

**lib/roi-calculator.ts**
- Time savings calculation
- Cost analysis
- Productivity metrics

## Technology Decisions

### Why Next.js?
- Server-side API routes
- React ecosystem
- Easy deployment
- Built-in optimization

### Why Claude 3.5 Sonnet?
- Best-in-class reasoning
- Structured output
- Reliable JSON generation
- Context understanding

### Why React Flow?
- Professional visualizations
- Interactive diagrams
- Easy customization
- Good documentation

### Why n8n?
- Open source
- Visual workflow editor
- Extensive integrations
- Self-hostable

## Security Considerations

1. **API Keys** - Stored in environment variables only
2. **Input Validation** - All inputs sanitized
3. **JSON Parsing** - Safe parsing with error handling
4. **CORS** - Configured for production
5. **Rate Limiting** - Should be added for production

## Scalability

### Current Setup
- Single server
- Synchronous processing
- In-memory operations

### Production Enhancements
- Queue system (Bull/BeeQueue)
- Database for storage (MongoDB/PostgreSQL)
- Caching layer (Redis)
- Load balancing
- CDN for static assets

## Future Enhancements

1. **User Authentication** - Save workflows per user
2. **Database Integration** - Store analyses
3. **Real-time Collaboration** - Share workflows
4. **Advanced Templates** - More n8n patterns
5. **AI Training** - Learn from feedback
6. **Multi-language Support** - i18n
7. **Mobile App** - React Native version
8. **Analytics Dashboard** - Usage metrics

## Performance Metrics

- **API Response Time**: ~3-5 seconds (Claude analysis)
- **Page Load**: <2 seconds
- **Bundle Size**: Optimized with Next.js
- **Visualization Render**: <1 second

## Deployment Options

### Vercel (Recommended)
- Automatic deployments
- Edge functions
- Global CDN
- Zero configuration

### Docker
- Containerized app
- Easy scaling
- Self-hosted option

### Traditional VPS
- Full control
- Custom configuration
- Manual management

---

**Architecture optimized for hackathon demonstration and production readiness**
