const snarkjs = require("snarkjs");
const downloadFile = require("downloadjs");

function downloadFromLink(link: string): Promise<void | Response> {
  let headers = new Headers();
  headers.append('Content-Disposition', 'attachment');
  return fetch(link, {
      method : "GET",
      mode: 'no-cors',
      headers: headers
    })
    .then( res => res.blob() )
    .then( blob => {
      downloadFile(blob);
    });
}

export const downloadProofFiles = async function (filename: string) {
  const zkeySuffix = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const filePromises: Promise<void | Response>[] = [];
  for (const c of zkeySuffix) {
    filePromises.push(downloadFromLink(`https://d27ahxc61uj811.cloudfront.net/${filename}.zkey${c}`));
  }
  filePromises.push(downloadFromLink(`https://d27ahxc61uj811.cloudfront.net/${filename}.wasm`));
  await Promise.all(filePromises);
}

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