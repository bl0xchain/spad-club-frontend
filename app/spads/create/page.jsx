import Card from '@/components/template/Card'
import Container from '@/components/template/Container'
import Text from '@/components/template/Text'

const CreateSpadPage = () => {
	return (
		<Container>
			<div className='flex justify-center gap-5 mb-5'>
				<div className='flex-initial w-72'>
					<Card href="/spads/create/public">
						<h2 className='font-bold text-center text-lg'>
							<Text>Public SPAD</Text>
						</h2>
						<p className='text-center'>Public SPADs are open investment opportunities for everyone. Here, you can explore, analyze, and contribute to various projects that align with your investment interests. Our transparent and intuitive interface makes investing as simple as a click, no matter your level of expertise. Join us in pioneering the next big crypto project.</p>
					</Card>
				</div>
				<div className='flex-initial w-72'>
					<Card href="/spads/create/private">
						<h2 className='font-bold text-center text-lg'>
							<Text>Private SPAD</Text>
						</h2>
						<p className='text-center'>Looking for exclusive investment opportunities? Welcome to Private SPADs. This invitation-only SPAD is designed for individuals who possess a unique passkey. It offers exclusive access to high-potential crypto projects before they hit the mainstream market. Enter your unique passkey to unlock your potential.<br />&nbsp;</p>
					</Card>
				</div>
			</div>
			<div className='flex justify-center gap-5'>
				<div className='flex-initial w-72'>
					<Card href="/clubs/create">
						<h2 className='font-bold text-center text-lg'>
							<Text>SPAD CLUB</Text>
						</h2>
						<p className='text-center'>SPAD Clubs is an exciting opportunity for like-minded investors to collaborate and make collective investment decisions. Create your own club, invite your friends, and join forces to make your mark in the crypto world. With SPAD Clubs, you can share insights, pool resources, and maximize your collective investment power. It's time to turn your investment group into a powerhouse.</p>
					</Card>
				</div>
			</div>
		</Container>
	)
}

export default CreateSpadPage