import React, {useContext, useState, useEffect} from "react";
import {ethers } from "ethers";

export const TransactionContext = React.createContext();

const {ethereum} = window;

