import React from "react";
import type { Preference } from "../types";

interface Props {
  preferences: Preference[];
}

const GroupPreferencesList: React.FC<Props> = ({ preferences }) => (
  <div>
    <h2>🍴 Group Preferences</h2>
    <ul>
      {preferences.map((p, i) => (
        <li key={i}>
          <strong>{p.userId}</strong>: {p.cuisine}, {p.price}, {p.dietary}
        </li>
      ))}
    </ul>
  </div>
);

export default GroupPreferencesList;
