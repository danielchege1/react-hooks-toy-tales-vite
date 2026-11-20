import React, { useState } from "react";

function ToyForm({
  onAddToy,
  initialValues = {},
  submitLabel = "Create New Toy",
}) {
  const [name, setName] = useState(initialValues.name || "");
  const [image, setImage] = useState(initialValues.image || "");
  const [price, setPrice] = useState(initialValues.price ?? "0");
  const [description, setDescription] = useState(
    initialValues.description || "",
  );
  const [submissionError, setSubmissionError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmissionError("");
    try {
      await onAddToy({
        name: name.trim(),
        image: image.trim(),
        price: Number(price),
        description: description.trim(),
      });
    } catch (error) {
      setSubmissionError(error.message);
    }
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h2>{submitLabel === "Create New Toy" ? "Create a toy!" : "Edit product"}</h2>
        <label htmlFor="toy-name">Product name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          id="toy-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label htmlFor="toy-image">Image URL</label>
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          id="toy-image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          required
        />
        <label htmlFor="toy-price">Price (USD)</label>
        <input
          type="number"
          name="price"
          id="toy-price"
          className="input-text"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <label htmlFor="toy-description">Description</label>
        <textarea
          name="description"
          id="toy-description"
          className="input-text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows="3"
        />
        <input
          type="submit"
          name="submit"
          value={submitLabel}
          className="submit"
        />
        {submissionError && <p role="alert">{submissionError}</p>}
      </form>
    </div>
  );
}

export default ToyForm;
