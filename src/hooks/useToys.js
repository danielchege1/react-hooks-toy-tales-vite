import { useCallback, useEffect, useState } from "react";

const TOYS_URL = "http://localhost:3001/toys";

async function readResponse(response, action) {
  if (!response.ok) {
    throw new Error(`Failed to ${action}: ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

export default function useToys() {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadToys = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(TOYS_URL);
      setToys(await readResponse(response, "load products"));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadToys();
  }, [loadToys]);

  const addToy = useCallback(async (toyDetails) => {
    setError("");
    try {
      const response = await fetch(TOYS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toyDetails, likes: 0 }),
      });
      const newToy = await readResponse(response, "create product");
      setToys((currentToys) => [...currentToys, newToy]);
      return newToy;
    } catch (requestError) {
      setError(requestError.message);
      return null;
    }
  }, []);

  const updateToy = useCallback(async (toyId, changes) => {
    setError("");
    try {
      const response = await fetch(`${TOYS_URL}/${toyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      const updatedToy = await readResponse(response, "update product");
      setToys((currentToys) =>
        currentToys.map((toy) =>
          String(toy.id) === String(updatedToy.id) ? updatedToy : toy,
        ),
      );
      return updatedToy;
    } catch (requestError) {
      setError(requestError.message);
      return null;
    }
  }, []);

  const deleteToy = useCallback(async (toyId) => {
    setError("");
    try {
      const response = await fetch(`${TOYS_URL}/${toyId}`, {
        method: "DELETE",
      });
      await readResponse(response, "delete product");
      setToys((currentToys) =>
        currentToys.filter((toy) => String(toy.id) !== String(toyId)),
      );
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  }, []);

  const likeToy = useCallback(
    async (toy) => updateToy(toy.id, { likes: toy.likes + 1 }),
    [updateToy],
  );

  return {
    toys,
    loading,
    error,
    addToy,
    updateToy,
    deleteToy,
    likeToy,
  };
}
