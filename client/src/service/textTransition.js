import TextTransition, { presets } from 'react-text-transition'

export const textTransition = (text) => {
	return (
		<TextTransition
			text={text}
			springConfig={presets.wobbly}
			style={{
				marginLeft: '50%',
				transform: 'translateX(-50%)',
			}}
		/>
	)
}
