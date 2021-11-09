import Head from 'next/head';
import dynamic from 'next/dynamic';
import {CHAINS_CONFIG} from 'lib/constants';
import {CHAINS, ChainPropT} from 'types';
import {fetchMarkdownForChainId} from 'utils/markdown';
import {Spinner} from 'components/shared/Layout/Spinner';
import {colors} from 'utils/colors';

const dynOptions = {
  loading: function spinner() {
    return <Spinner color={colors.figmentYellow} />;
  },
  ssr: false,
};

export async function getStaticProps() {
  return {
    props: {
      chain: CHAINS_CONFIG[CHAINS.AVALANCHE],
      markdown: fetchMarkdownForChainId(CHAINS.AVALANCHE),
    },
  };
}

const Avalanche = (props: ChainPropT) => {
  const {chain, markdown} = props;
  const DynChain = dynamic(
    () => import('../components/protocols/avalanche'),
    dynOptions,
  );

  return (
    <>
      <Head>
        <title>{`Figment Learn - ${chain.label} Pathway`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynChain chain={chain} markdown={markdown} />
    </>
  );
};

export default Avalanche;
