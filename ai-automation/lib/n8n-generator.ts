interface WorkflowAnalysis {
  triggers: string[];
  actions: string[];
  recommended_tools: string[];
}

interface FormData {
  businessName: string;
  toolsUsed: string;
}

// Predefined n8n workflow templates
const templates = {
  whatsapp: {
    id: 'whatsapp-trigger',
    type: 'n8n-nodes-base.webhook',
    name: 'WhatsApp Webhook',
    parameters: {
      path: 'whatsapp-incoming',
      responseMode: 'onReceived',
    },
  },
  email: {
    id: 'email-trigger',
    type: 'n8n-nodes-base.emailReadImap',
    name: 'Email Trigger',
    parameters: {
      mailbox: 'INBOX',
      format: 'simple',
    },
  },
  form: {
    id: 'form-trigger',
    type: 'n8n-nodes-base.webhook',
    name: 'Form Submission',
    parameters: {
      path: 'form-submit',
      responseMode: 'onReceived',
    },
  },
  database: {
    id: 'database-action',
    type: 'n8n-nodes-base.postgres',
    name: 'Save to Database',
    parameters: {
      operation: 'insert',
      schema: 'public',
    },
  },
  googleSheets: {
    id: 'sheets-action',
    type: 'n8n-nodes-base.googleSheets',
    name: 'Update Google Sheets',
    parameters: {
      operation: 'append',
      sheetName: 'Sheet1',
    },
  },
  sendEmail: {
    id: 'email-action',
    type: 'n8n-nodes-base.emailSend',
    name: 'Send Email',
    parameters: {
      fromEmail: 'automation@company.com',
      subject: 'Automated Notification',
    },
  },
  invoice: {
    id: 'invoice-action',
    type: 'n8n-nodes-base.httpRequest',
    name: 'Generate Invoice',
    parameters: {
      method: 'POST',
      url: 'https://api.invoice-service.com/generate',
    },
  },
  payment: {
    id: 'payment-action',
    type: 'n8n-nodes-base.stripe',
    name: 'Process Payment',
    parameters: {
      operation: 'charge',
    },
  },
  notification: {
    id: 'notification-action',
    type: 'n8n-nodes-base.slack',
    name: 'Send Notification',
    parameters: {
      operation: 'sendMessage',
    },
  },
};

export function generateN8nWorkflow(analysis: WorkflowAnalysis, formData: FormData) {
  const nodes: any[] = [];
  const connections: any[] = [];
  let nodeIdCounter = 1;

  // Determine trigger based on analysis
  let triggerNode;
  const toolsLower = formData.toolsUsed.toLowerCase();
  
  if (toolsLower.includes('whatsapp')) {
    triggerNode = { ...templates.whatsapp, id: `node-${nodeIdCounter++}` };
  } else if (toolsLower.includes('email')) {
    triggerNode = { ...templates.email, id: `node-${nodeIdCounter++}` };
  } else {
    triggerNode = { ...templates.form, id: `node-${nodeIdCounter++}` };
  }
  
  nodes.push(triggerNode);

  // Add action nodes based on analysis
  let previousNodeId = triggerNode.id;

  analysis.actions.forEach((action, index) => {
    let actionNode;
    const actionLower = action.toLowerCase();

    if (actionLower.includes('database') || actionLower.includes('save') || actionLower.includes('store')) {
      actionNode = { ...templates.database, id: `node-${nodeIdCounter++}`, name: action };
    } else if (actionLower.includes('sheet') || actionLower.includes('spreadsheet')) {
      actionNode = { ...templates.googleSheets, id: `node-${nodeIdCounter++}`, name: action };
    } else if (actionLower.includes('email') || actionLower.includes('notification') || actionLower.includes('send')) {
      actionNode = { ...templates.sendEmail, id: `node-${nodeIdCounter++}`, name: action };
    } else if (actionLower.includes('invoice')) {
      actionNode = { ...templates.invoice, id: `node-${nodeIdCounter++}`, name: action };
    } else if (actionLower.includes('payment') || actionLower.includes('charge')) {
      actionNode = { ...templates.payment, id: `node-${nodeIdCounter++}`, name: action };
    } else {
      actionNode = { ...templates.notification, id: `node-${nodeIdCounter++}`, name: action };
    }

    nodes.push(actionNode);
    connections.push({
      source: previousNodeId,
      target: actionNode.id,
    });
    previousNodeId = actionNode.id;
  });

  // Return n8n compatible workflow JSON
  return {
    name: `${formData.businessName} Automated Workflow`,
    nodes: nodes.map((node, index) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      typeVersion: 1,
      position: [250 * index, 300],
      parameters: node.parameters,
    })),
    connections: connections,
    active: false,
    settings: {
      executionOrder: 'v1',
    },
    tags: ['automated', 'ai-generated'],
  };
}
