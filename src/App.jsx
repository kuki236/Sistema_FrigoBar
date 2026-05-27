import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useState } from "react";

import { mockInventory } from "./data/mockInventory";

import InventoryScreen from "./pages/InventoryScreen";
import ExpiryScreen from "./pages/ExpiryScreen";
import ExpirySettingsScreen from "./pages/ExpirySettingsScreen";
import HungryScreen from "./pages/HungryScreen";
import RecipeDetailScreen from "./pages/RecipeDetailScreen";
function App() {

  const [inventory, setInventory] =
    useState(mockInventory);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <InventoryScreen
              inventory={inventory}
              setInventory={setInventory}
            />
          }
        />

        <Route
          path="/expiry"
          element={
            <ExpiryScreen
              inventory={inventory}
            />
          }
        />

        <Route
          path="/expiry-settings"
          element={
            <ExpirySettingsScreen
              inventory={inventory}
              setInventory={setInventory}
            />
          }
        />
<Route
  path="/recipes"
  element={
    <HungryScreen
      inventory={inventory}
    />
  }
/>
<Route
  path="/recipes/:id"
  element={
    <RecipeDetailScreen />
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;