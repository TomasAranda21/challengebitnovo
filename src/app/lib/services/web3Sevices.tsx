import Web3 from 'web3';


export async function getMetaMaskProvider() {
    if (!('ethereum' in window) || !(window as any).ethereum) {
        console.log('No hay ethereum en window')
        return { error: true };
    }
    try {
        if(!window?.ethereum) return {error: true}
        
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()

        if( !accounts || !accounts.length) return console.log('No hay cuentas')
    
        return web3
    } catch (error) {
        console.log(error) 
    }
}

export async function tranferMetaMask(to:string, quantity:string) {
    
    try {
        
        const web3 = await getMetaMaskProvider()
        if (!web3 || (web3 as any).error) {
            return { error: 'Instala MetaMask e inicia sesión en tu cuenta' };
          }
        await web3.eth.getCode(to)
        const accounts = await web3.eth.getAccounts()
        const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest')
        const value = web3.utils.toWei(quantity, 'ether')

        const data = {
            from : accounts[0],
            to,
            value,
            nonce,
            gas: 21000,
        }

        const tx = await web3.eth.sendTransaction(data)

        return tx.transactionHash
    } catch (error) {
        return {
            error: `La transaccion no se pudo realizar ${error}`
        }
    }
}
