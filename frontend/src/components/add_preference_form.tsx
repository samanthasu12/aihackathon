import React, { useState } from "react";
import type { Preference } from "../types";

interface Props {
  onAdd: (pref: Preference) => void;
}

const AddPreferenceForm: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Preference>({
    userId: "",
    cuisine: "",
    price: "$",
    dietary: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ userId: "", cuisine: "", price: "$", dietary: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userId" value={formData.userId} onChange={handleChange} placeholder="Name" required />
      <input name="cuisine" value={formData.cuisine} onChange={handleChange} placeholder="Cuisine" required />
      <select name="price" value={formData.price} onChange={handleChange}>
        <option>$</option>
        <option>$$</option>
        <option>$$$</option>
      </select>
      <input name="dietary" value={formData.dietary} onChange={handleChange} placeholder="Dietary" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPreferenceForm;
