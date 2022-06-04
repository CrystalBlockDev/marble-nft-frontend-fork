import React from 'react'
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { NFTDetail } from 'features/nft/market/detail'
import { useState } from "react";
import { styled } from 'components/theme'
import { useRouter } from 'next/router'

export default function Home() {
  const { asPath, pathname } = useRouter()
  const id = asPath.split("/")[2]
  const collection = asPath.split("/")[1]
  console.log("asPath:", collection, id)
  const [fullWidth, setFullWidth] = useState(true);

  return (

    <AppLayout fullWidth={fullWidth}>
      <PageHeader
          title=""
          subtitle=""
          align="center"
        />
      <Container className="middle mauto">

        <NFTDetail collection={collection} id={id}/>
      </Container>
    </AppLayout>
  )
}

const Container = styled('div', {

})
