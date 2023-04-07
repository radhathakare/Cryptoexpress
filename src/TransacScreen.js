import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import Web3 from "web3";
import logo from './logo.svg';


const web3 = new Web3(
  "https://sepolia.infura.io/v3/314bebade4f0435d94be1a5dd6db53bd"
);
const privateKey =
  "9575a14e57369ddf607721724753461dba02cb26883c750f44d64f8d19351cc3";
const gasPrice = "63000";

function TransacScreen() {
  const [toAddress, setToAddress] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  const sendEth = async () => {
    try {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const txObject = {
        from: account.address,
        to: toAddress,
        value: web3.utils.toWei(value, "ether"),
        gasPrice: gasPrice,
        gas: "63000" 
      };
      const signedTx = await web3.eth.accounts.signTransaction(
        txObject,
        privateKey
      );
      const txHash = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      setStatus(`Transaction successful, hash: ${txHash}`);
    } catch (error) {
      console.error(error);
      setStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.app}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: logo }} style={styles.image} />
      </View>
      <Text style={styles.title}>Buy,Trade & Sell</Text>

      <TextInput
        style={styles.input}
        placeholder="To address*"
        value={toAddress}
        onChangeText={setToAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Value (ETH)*"
        value={value}
        onChangeText={setValue}
      />
      <Button style={styles.button} title="Submit" onPress={sendEth} />
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  imageContainer: {
    padding: 10
  },
  image: {
    height: 90
  },
  app: {
    margin: 40,
    padding: 40
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: "#7CB9E8",
    borderRadius: 20,
    padding: 20
  },
  text: {
    padding: 10,
    color: "#AA0000"
  }
});

export default TransacScreen;
