// nodes/Webhooks/webhooks.node.ts
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Webhooks implements INodeType {
  description: INodeTypeDescription = require('./webhooks.node.json');

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;
      const webhookId = this.getNodeParameter('webhookId', i, '') as string;
      const agentId = this.getNodeParameter('agentId', i, '') as string;

      let body: any = {};
      const options: any = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'getAll': {
          options.uri = 'https://tess.pareto.io/api/webhooks';
          break;
        }
        case 'delete': {
          options.method = 'DELETE';
          options.uri = `https://tess.pareto.io/api/webhooks/${webhookId}`;
          break;
        }
        case 'getAgentWebhooks': {
          options.uri = `https://tess.pareto.io/api/agents/${agentId}/webhooks`;
          break;
        }
        case 'createAgentWebhook': {
          options.method = 'POST';
          options.uri = `https://tess.pareto.io/api/agents/${agentId}/webhooks`;
          const url = this.getNodeParameter('url', i) as string;
          body = { url };
          options.body = body;
          break;
        }
        default:
          throw new Error(`Operação '${operation}' não suportada!`);
      }

      const response = await this.helpers.requestWithAuthentication.call(
        this,
        'tessApi',
        options
      );

      returnData.push({ json: response });
    }

    return [returnData];
  }
}