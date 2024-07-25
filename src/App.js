import React, { Component } from 'react';
import News from './News';
import Navbar from './Navbar';
import Main from './Main.js';
import Result from './Result.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Text, Progress, FlexboxGrid, Input, InputGroup, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { SuprSendProvider } from "@suprsend/react-headless";

export default function App() {
  let allGenre = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  return (
    <>
    <SuprSendProvider
      workspaceKey="HIDT0RLWsjgwu7DaPZGP"
      distinctId="rishabh.kamboj.eee21@itbhu.ac.in"
      subscriberId="15vXZv2ujOziH5aazB2K8DwRwzlxAWHZvB2hgb31nwU" // Replace with actual user ID
    >
      <div style={{ backgroundColor: '#16243C' }}>
        <Router>
        <div style={{ overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' ,position : 'relative'}}>
              <Navbar title="Daily News" about="About Us" />
            </div>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Main genre={'general'} />} />
                <Route exact path="/business" element={<Main genre={'business'} />} />
                <Route exact path="/entertainment" element={<Main genre={'entertainment'} />} />
                <Route exact path="/health" element={<Main genre={'health'} />} />
                <Route exact path="/science" element={<Main genre={'science'} />} />
                <Route exact path="/sports" element={<Main genre={'sports'} />} />
                <Route exact path="/technology" element={<Main genre={'technology'} />} />
                <Route exact path="/result" element={<Result />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
      </SuprSendProvider>
    </>
  );
}
