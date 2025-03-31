// nodes/Files/files.node.ts
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Files implements INodeType {
  description: INodeTypeDescription = require('./files.node.json');

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;
      const fileId = this.getNodeParameter('fileId', i, '') as string;
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
          options.uri = 'https://tess.pareto.io/api/files';
          break;
        }
        case 'getById': {
          options.uri = `https://tess.pareto.io/api/files/${fileId}`;
          break;
        }
        case 'upload': {
          options.method = 'POST';
          options.uri = 'https://tess.pareto.io/api/files';
          const name = this.getNodeParameter('name', i) as string;
          const content = this.getNodeParameter('content', i) as string;
          body = { name, content };
          options.body = body;
          break;
        }
        case 'delete': {
          options.method = 'DELETE';
          options.uri = `https://tess.pareto.io/api/files/${fileId}`;
          break;
        }
        case 'process': {
          options.method = 'POST';
          options.uri = `https://tess.pareto.io/api/files/${fileId}/process`;
          break;
        }
        case 'getAgentFiles': {
          options.uri = `https://tess.pareto.io/api/agents/${agentId}/files`;
          break;
        }
        case 'linkToAgent': {
          options.method = 'POST';
          options.uri = `https://tess.pareto.io/api/agents/${agentId}/files`;
          const fileIdToLink = this.getNodeParameter('fileId', i) as string;
          body = { file_id: fileIdToLink };
          options.body = body;
          break;
        }
        case 'removeFromAgent': {
          options.method = 'DELETE';
          const fileIdToRemove = this.getNodeParameter('fileId', i) as string;
          options.uri = `https://tess.pareto.io/api/agents/${agentId}/files/${fileIdToRemove}`;
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