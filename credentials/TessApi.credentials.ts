import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class TessApi implements ICredentialType {
	name = 'tessApi';
	displayName = 'Tess API';
	properties = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic' as const,
		properties: {
			headers: {
				Authorization: 'Bearer {{ $credentials.apiKey }}',
			},
		},
	};
}