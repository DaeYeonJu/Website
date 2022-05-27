import React, { FC, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { mintAnimalTokenContract } from "../web3Config";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
  account: string;
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();

        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        setNewAnimalType(animalType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      w="full"
      h="20vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box>
        {newAnimalType ? (
          <AnimalCard animalType={newAnimalType} />
        ) : (
          <Text>Upload your Image!</Text>
        )}
      </Box>
      <Flex  w="full"h="25vh" justifyContent="center" alignItems="center" direction="column">
      </Flex>
      <Flex  w="full" h="70vh"justifyContent="space-around" alignItems="space-around" direction="row">
        <Button onClick={onClickMint}>Mint1</Button>
        <Button onClick={onClickMint}>Mint2</Button>
        <Button onClick={onClickMint}>Mint3</Button>
      </Flex>
      <Flex  w="60vh" h="50vh"justifyContent="space-around" alignItems="space-around" direction="row">
        <Button onClick={onClickMint}>Mint4</Button>
        <Button onClick={onClickMint}>Mint5</Button>
      </Flex>
    </Flex>
  );
};

export default Main;
