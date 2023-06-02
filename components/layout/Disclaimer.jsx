import React, { useState } from 'react'
import Modal from '../template/Modal';
import Button from '../template/Button';

const Disclaimer = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <p className='text-sm'>* Investing in cryptocurrency projects via SPAD involves a high level of risk, including the potential loss of all your invested capital. Please read and understand the following risk disclosure before deciding to invest. <span onClick={() => setVisible(true)} className='underline cursor-pointer'>Know More</span></p>
            <Modal show={visible} onClose={() => setVisible(false)}>
                <div className="flex flex-col gap-3 text-start text-gray-800">
                    <p className='font-bold'>Investment Risk Disclaimer</p>
                    <p>Investing in cryptocurrency projects via SPAD involves a high level of risk, including the potential loss of all your invested capital. Please read and understand the following risk disclosure before deciding to invest:</p>
                    <p>
                        <span className='font-bold'>1. Market Risk</span>: Cryptocurrencies are highly volatile, and the price of tokens can increase or decrease rapidly. The value of your investment may fall as well as rise, and you may get back less than you initially invested.
                    </p>
                    <p>
                        <span className='font-bold'>2. Regulatory Risk</span>: The regulatory environment for cryptocurrencies is evolving and can change rapidly. This could have significant impacts on the value of specific crypto assets and projects.
                    </p>
                    <p>
                        <span className='font-bold'>3. Liquidity Risk</span>: Some cryptocurrencies may not be widely traded, which means that significant buy or sell transactions may materially impact the token's price. In certain scenarios, it may be difficult to sell or exchange your tokens.
                    </p>
                    <p>
                        <span className='font-bold'>4. Technical Risk</span>: Cryptocurrencies operate on technology systems, and like all technology, they are susceptible to flaws, bugs, hacks, or outages which could result in a complete loss of your invested capital.
                    </p>
                    <p>
                        <span className='font-bold'>5. Fraud and Scam Risk</span>: While SPAD makes every effort to verify the authenticity of the projects listed, the space is known to attract fraudulent actors. Be vigilant and research thoroughly before investing.
                    </p>
                    <p>
                        <span className='font-bold'>6. Risk of Obsolescence</span>: Cryptocurrency projects can become outdated due to rapid technological development in the blockchain space. This may lead to a loss in the value of your investment.
                    </p>
                    <p>
                        This list is not exhaustive and does not highlight all possible risks associated with cryptocurrency investments. SPAD strongly advises that you conduct your own research and consult with a qualified investment professional before deciding to invest. By investing through SPAD, you agree that you are aware of these risks and that you are solely responsible for the decisions you make regarding your investments. Investing in cryptocurrencies is not suitable for all investors, and you should only invest money you can afford to lose.
                    </p>
                    <div className='inline-block mx-auto'>
                        <Button onClick={() => setVisible(false)}>I Understand</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Disclaimer