import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"; // ES Modules import

export default async function getParameter (paramName) {
    const client = new SSMClient()
    const input = {
        Name: `/spotlight/${paramName}`,
        WithDecryption: true,
    };
    try {
        const response = await client.send(new GetParameterCommand(input))
        return response.Parameter.Value
    } catch (e) {
        throw new Error('Parameter Store not reached')
    }
}