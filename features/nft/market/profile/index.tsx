import * as React from "react"
import { useCallback, useState, useEffect } from "react"
import { Button } from 'components/Button'
import { styled } from 'components/theme'
import { IconWrapper } from 'components/IconWrapper'
import { Activity, Grid, Search, ColumnBig, ColumnSmall } from 'icons'
import { CollectionFilter } from "./filter"
import { NftTable } from "components/NFT"

import {
  NftInfo,
} from "services/nft"
import { useRecoilValue } from 'recoil'
import { CW721, Marble, useSdk } from 'services/nft'
import { walletState } from 'state/atoms/walletAtoms'

import { 
  ChakraProvider, 
  Tab, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Select, 
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux"
import { setUIData } from "store/actions/uiAction"
import { setFilterData } from "store/actions/filterAction"
import { NFT_COLUMN_COUNT, UI_ERROR, FILTER_STATUS, FILTER_STATUS_TXT } from "store/types"

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721_CONTRACT || ''
const PUBLIC_CW721_OWNER = process.env.NEXT_PUBLIC_CW721_OWNER || ''
export const ProfileTab = ({index}) => {
  return (
    <TabWrapper>
      <Tab>
        <Button className={`tab-link ${index==0?'active':''}`}
            as="a"
            variant="ghost"
          >
            All
        </Button>
      </Tab>
      <Tab>
        <Button className={`tab-link ${index==1?'active':''}`}
            as="a"
            variant="ghost"
          >
            Created
        </Button>
      </Tab>
      <Tab>
        <Button className={`tab-link ${index==2?'active':''}`}
            as="a"
            variant="ghost"
          >
            Favorite
        </Button>
      </Tab>
      <Tab>
        <Button className={`tab-link ${index==3?'active':''}`}
            as="a"
            variant="ghost"
          >
            Activity
        </Button>
      </Tab>
      <Tab>
        <Button className={`tab-link ${index==4?'active':''}`}
            as="a"
            variant="ghost"
          >
            Offers
        </Button>
      </Tab>
    </TabWrapper>
  )
}
export const MyCollectedNFTs = () => {  
  const [isCollapse, setCollapse] = useState(false)
  const [isLargeNFT, setLargeNFT] = useState(true)
  const [nfts, setNfts] = useState<NftInfo[]>(
    [
      {'tokenId': 'aaa1', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa2', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa3', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa4', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa5', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa6', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa7', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa8', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa9', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
      {'tokenId': 'aaa10', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' },
    ]
  )
  const dispatch = useDispatch()
  const uiListData = useSelector((state) => state.uiData)
  const { nft_column_count } = uiListData
  
  const filterData = useSelector((state) => state.filterData)
  const { filter_status } = filterData

  const closeFilterStatusButton = (fstatus) => {
    console.log(filter_status)
    filter_status.splice(filter_status.indexOf(fstatus), 1)
    dispatch(setFilterData(FILTER_STATUS, filter_status))
    return true
  }
  const closeFilterAllStatusButtons = () => {
    dispatch(setFilterData(FILTER_STATUS, []))
    return true
  }
  useEffect(() => {
    if (isLargeNFT){
      if (nft_column_count <= 3)
        return
      dispatch(setUIData(NFT_COLUMN_COUNT, nft_column_count - 1))
    }else{
      if (nft_column_count >= 5)
        return
      dispatch(setUIData(NFT_COLUMN_COUNT, nft_column_count +1))
    }
    
  }, [dispatch, isLargeNFT])

  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [tokens, setNFTIds] = useState([""])

  const loadNfts = useCallback(async () => {
    if (!client) return
    const marbleContract = Marble(PUBLIC_CW721_CONTRACT).use(client)
    const contractConfig = await marbleContract.getConfig()
    console.log("cw721:", contractConfig.cw721_address)
    const contract = CW721(contractConfig.cw721_address).use(client)
    const nftTokens = await contract.tokens(PUBLIC_CW721_OWNER)
    setNFTIds(nftTokens.tokens)
  }, [client])

  useEffect(() => {
    loadNfts()
  }, [loadNfts])

  return (
    <CollectionWrapper>
      <CollectionFilter isCollapse={isCollapse} setCollapse={setCollapse} />
      <NftList className={`${isCollapse?'collapse-close':'collapse-open'}`}>
        <SearchItem>
          <ChakraProvider>
            <InputGroup >
              <Input
                pr='48px'
                type='text'
                placeholder='Search'
              />
              <InputRightElement width='48px'>
                <IconWrapper icon={<Search />} />
              </InputRightElement>
            </InputGroup>
            <Select id='item_type' placeholder='Single Items'>
              <option>Single Items</option>
              <option>Bundles</option>
              <option>All Items</option>
            </Select>
            <Select id='sort_type' placeholder='Price: Low to High'>
              <option>Recently Listed</option>
              <option>Recently Created</option>
              <option>Recently Sold</option>
              <option>Recently Received</option>
              <option>Ending Soon</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Last Sale</option>
              <option>Most Viewed</option>
              <option>Most Favorited</option>
              <option>Oldest</option>
            </Select>
            <ColumnCount>
              <IconButton 
                className={`column-type ${isLargeNFT?'active':''}`} 
                aria-label='Search database' 
                icon={<ColumnBig />} 
                onClick={() => {
                  if (isLargeNFT)
                    return
                  setLargeNFT(!isLargeNFT)
                  return false
                }}
              />
              <IconButton 
                className={`column-type ${!isLargeNFT?'active':''}`} 
                aria-label='Search database' 
                icon={<ColumnSmall />} 
                onClick={() => {
                  if (!isLargeNFT)
                    return
                  setLargeNFT(!isLargeNFT)
                  return false
                }}
              />
            </ColumnCount>
          </ChakraProvider>
        </SearchItem>
        <FilterItem>
          {filter_status.map(fstatus => (
            <Tag
              borderRadius='full'
              variant='solid'
              key={fstatus}
            >
              <TagLabel>{FILTER_STATUS_TXT[fstatus]}</TagLabel>
              <TagCloseButton onClick={()=>closeFilterStatusButton(fstatus)}/>
            </Tag>
          ))}
          {filter_status.length > 0 &&
            <Tag
              borderRadius='full' 
              variant='solid'
            >
              <TagLabel>Clear All</TagLabel>
              <TagCloseButton onClick={()=>closeFilterAllStatusButtons()}/>
            </Tag>
          }
          {tokens.length > 0 && tokens.map((token)=>{
            return (<div>{token}</div>)
          })}
        </FilterItem>
        <NftTable data={nfts}/>
      </NftList>
    </CollectionWrapper>
  )
}

const CollectionWrapper = styled('div', {
  display: 'flex',
  ' .category-menus':{
    borderBottom: '$borderWidths$1 solid $borderColors$default',
    display: 'flex',
    justifyContent: 'space-between',
    overFlow: 'hidden',
    '&.desktop-section': {
      ' a':{
        minWidth: '8%',
      }
    },
    '&.mobile-section': {
      ' a':{
        minWidth: '18%',
      }
    },
    ' a':{
      
      textAlign: 'center',
      paddingBottom: '$8',
      '&.active':{
        borderBottom: '4px solid $selected',
      }
    }
  }
})
const TabWrapper = styled('div', {
  
  display: 'flex',
  justifyContent: 'center',
  ' .tab-link': {
    ' .active': {
      color: '$black',
    },
    borderBottomColor: '$textColors$primary',
    ' svg': {
      stroke: '$iconColors$primary'
    }
  }
})

const NftList = styled('div', {
  padding: '$16 0 0 $16',
  '&.collapse-open':{
    width: 'calc(100% - $25)',
  },
  '&.collapse-close':{
    width: 'calc(100% - $10)',
  },
  ' .nft-table':{
    display: 'flex',
    gap: '$16',
  }
})

const SearchItem = styled('div', {
  display: 'flex',
  gap: '$6',
  ' .chakra-input':{
    height: '$22',
    border: '$borderWidths$1 solid $borderColors$default',
  },
  ' .chakra-input__right-element':{
    height: '$22',
  },
  ' .chakra-select__wrapper':{
    width: '$26',
    ' select':{
      border: '$borderWidths$1 solid $borderColors$default',
      height: '$22',
      width: '$26',
    }
  }
  
})
const FilterItem = styled('div', {
  display: 'flex',
  gap: '$4',
  margin: '$4 0',
  ' >span':{
    background: '$backgroundColors$primary',
    color: '$textColors$primary',
    borderRadius: '$3',
    padding: '$4',
  }
})
const ColumnCount = styled('div', {
  display: 'flex',
  gap: '$2',
  ' button':{
    height: '$22',
    background: '$backgroundColors$main',
    border: '$borderWidths$1 solid $borderColors$default',
    ' svg': {
      ' rect': {
        fill: '$iconColors$disabled'
      }
    },
    '&.active':{
      ' svg': {
        ' rect': {
          fill: '$iconColors$primary'
        }
      } 
    }
  }
})