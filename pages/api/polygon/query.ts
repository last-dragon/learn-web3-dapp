import {PolygonQueryResponse, PolygonQueryErrorResponse} from '@polygon/types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from '@polygon/lib';
import {ethers} from 'ethers';

export default async function query(
  _req: NextApiRequest,
  res: NextApiResponse<PolygonQueryResponse | PolygonQueryErrorResponse>,
) {
  const url = getNodeURL();
  const provider = new ethers.providers.JsonRpcProvider(url, 'any');

  try {
    const networkName = await provider.getNetwork().then((res) => {
      return res.name;
    });

    // TODO
    // Define those variables below
    const chainId = provider.network.chainId;
    const blockHeight = await provider.getBlockNumber();
    const gasPriceAsGwei = await provider.getGasPrice().then((res) => {
      return ethers.utils.formatUnits(res, 'gwei');
    });
    const blockInfo = await provider.getBlockWithTransactions(blockHeight);

    res.status(200).json({
      networkName,
      chainId,
      blockHeight,
      gasPriceAsGwei,
      blockInfo,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
