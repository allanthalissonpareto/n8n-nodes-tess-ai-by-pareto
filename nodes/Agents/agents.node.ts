// nodes/Agents/agents.node.ts
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
  } from 'n8n-workflow';
  
  export class Agents implements INodeType {
	description: INodeTypeDescription = require('./agents.node.json');
  
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	  const items = this.getInputData();
	  const returnData: INodeExecutionData[] = [];
  
	  for (let i = 0; i < items.length; i++) {
		const operation = this.getNodeParameter('operation', i) as string;
		const agentId = this.getNodeParameter('agentId', i, '') as string;
  
		let responseData;
		const options: any = {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  json: true,
		};
  
		switch (operation) {
		  case 'getAll': {
			options.uri = `https://tess.pareto.io/api/agents`;
			break;
		  }
		  case 'getById': {
			options.uri = `https://tess.pareto.io/api/agents/${agentId}`;
			break;
		  }
		  case 'execute': {
			options.method = 'POST';
			options.uri = `https://tess.pareto.io/api/agents/${agentId}/execute`;
			break;
		  }
		  case 'getResponse': {
			options.uri = `https://tess.pareto.io/api/agent-responses/${agentId}`;
			break;
		  }
		  default:
			throw new Error(`Operação '${operation}' não suportada!`);
		}
  
		responseData = await this.helpers.requestWithAuthentication.call(this, 'tessApi', options);
		returnData.push({ json: responseData });
	  }
  
	  return [returnData];
	}
  }  