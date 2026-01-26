module.exports = function (name) {
    const lowerName = name.toLowerCase();

    return `import { useState } from 'react'
import styles from './${name}.module.scss'

/**
 * ${name} Component
 */
export default function ${name}() {
  const [state, setState] = useState(null)

  return (
    <div className={styles.${lowerName}}>
      <h2>${name}</h2>
      <p>Your component is ready!</p>
    </div>
  )
}
`;
};
