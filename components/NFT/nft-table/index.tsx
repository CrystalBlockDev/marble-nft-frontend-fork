import * as React from "react";
import { useEffect } from "react";
import { LinkBox } from "@chakra-ui/react";
import { NftCard } from "../nft-card";
import { NftInfo } from "services/nft";
import { styled } from 'components/theme'
import { useDispatch, useSelector } from "react-redux";

interface NftTableProps {
  readonly data: NftInfo[]
}

export function NftTable({ data }: NftTableProps) {
  const dispatch = useDispatch()
  const uiListData = useSelector((state) => state.uiData)
  const { nft_column_count } = uiListData
  const filterData = useSelector((state) => state.filterData)
  const { filter_status } = filterData
  useEffect(() => {
    
  }, [dispatch, nft_column_count])

  return (
    <NftGrid className={`nft-grid column${nft_column_count}`}>
      {data.map(nft => (
        <LinkBox as="picture" key={nft.tokenId}
          transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s"
          _hover={{
            transform: "scale(1.05)"
          }}>
          <a href="/">
          <NftCard nft={nft} />
          </a>  
        </LinkBox>
      ))}
    </NftGrid>
  );
}
const NftGrid = styled('div', {
  display: 'grid',
  gap: '$16',
  padding: '$8',
  margin: '$16 0',
  '&.column3':{
    'gridTemplateColumns': 'repeat(3, calc( 33.3% - 21.3333px ))',
    ' .token-balance': {
      fontWeight: 'bold',
      fontSize: '$1',
    },
  },
  '&.column4':{
    'gridTemplateColumns': 'repeat(4, calc( 25% - 24px ))',
    ' .token-balance': {
      fontWeight: 'bold',
      fontSize: '$2',
    },
  },
  '&.column5':{
    'gridTemplateColumns': 'repeat(5, calc( 20% - 25.6px ))',
    ' .token-balance': {
      fontWeight: 'bold',
      fontSize: '$8',
    },
  },
  '&.column6':{
    'gridTemplateColumns': 'repeat(6, calc( 16.6% - 26.666px ))',
    ' .token-balance': {
      fontWeight: 'bold',
      fontSize: '$8',
    },
  }
})
