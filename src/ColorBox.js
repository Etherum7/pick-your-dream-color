import React from 'react';
import useToggle from './hooks/useToggle';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './styles/ColorBoxStyles';

function ColorBox({ background, name, moreUrl, showFullPalette, classes }) {
	const [ copied, toggleCopied ] = useToggle(false);
	
	function changeCopyState() {
		
		toggleCopied(copied);
		setTimeout(() => {
			toggleCopied(!copied);
		}, 1500);
		
		
	}
	
	return (
		<CopyToClipboard text={background} onCopy={changeCopyState}>
			<div style={{ backgroundColor: background }} className={classes.ColorBox}>
				<div
					style={{ backgroundColor: background }}
					className={classNames(classes.copyOverlay, {
						[classes.showOverlay]: copied
					})}
				/>

				<div
					className={classNames(classes.copyMsg, {
						[classes.showMsg]: copied
					})}
				>
					<h1>copied!</h1>
					<p className={classes.copyText}>{background}</p>
				</div>
				<div>
					<div className={classes.boxContent}>
						<span className={classes.colorName}>{name}</span>
					</div>
					<button className={classes.copyButton}>COPY</button>
					{showFullPalette && (
						<Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
							<span className={classes.seeMore}>MORE</span>
						</Link>
					)}
				</div>
			</div>
		</CopyToClipboard>
	);
}

export default withStyles(styles)(ColorBox);
