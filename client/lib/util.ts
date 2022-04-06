const snarkjs = require("snarkjs");

export const generateProof = async function (filename: string) {
  const input = await fetch(`./input_${filename}.json`).then(function(res) {
    return res.json();
  });

  const { proof, publicSignals } =
    await snarkjs.groth16.fullProve(
      input,
      `./${filename}.wasm`,
      `./${filename}.zkey`
    );
  
  return {
    proof: proof,
    publicSignals: publicSignals,
  };
}

export const verifyProof = async function(proof: string, publicSignals: string[], filename: string) {
  const vkey = await fetch(`./vkey_${filename}.json`).then(function(res) {
    return res.json();
  });
  const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

  return {
      verification: res,
  };
}