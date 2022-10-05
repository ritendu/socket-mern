import {Container,Box,Text} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
const Home = ()=>{
    return <Container maxW='xl' centerContent>
<Box d='flex' justifyContent='center' p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="1g" borderWidth="1px">
<Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>
</Box>
<Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px">
<Tabs variant='enclosed'>
  <TabList mb='1em'>
    <Tab width="50%">Signup</Tab>
    <Tab width="50%">Login</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Signup></Signup>
    </TabPanel>
    <TabPanel>
      <Login></Login>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>
    </Container>
}

export default Home