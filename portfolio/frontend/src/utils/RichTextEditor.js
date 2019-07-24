import { Editor } from 'slate-react';
import { Value } from 'slate';

import React, { Component } from 'react';
import { isKeyHotkey } from 'is-hotkey';
import { Image } from 'react-bootstrap';
import { _ } from 'underscore';

const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: Value.fromJSON(props.content),
        }

        localStorage.setItem('ap-content', JSON.stringify(props.content))
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                value: Value.fromJSON(this.props.content),
            })

            localStorage.setItem('ap-content', JSON.stringify(this.props.content))
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('ap-content');
    }

    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type === type)
    }

    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type === type)
    }

    ref = editor => {
        this.editor = editor
    }

    render() {
        const { renderToolBar } = this.props;
        return (
            <div>
                {
                    renderToolBar === undefined ? "" :
                    <div className="inintoku-toolbar">
                        { this.renderMarkButton('bold', '/static/inintoku/img/bold.png') }
                        { this.renderMarkButton('italic', '/static/inintoku/img/italic.png') }
                        { this.renderMarkButton('underlined', '/static/inintoku/img/underline.png') }
                        { this.renderMarkButton('code', '/static/inintoku/img/code.png') }
                        { this.renderBlockButton('heading-one', '/static/inintoku/img/h1.png') }
                        { this.renderBlockButton('heading-two', '/static/inintoku/img/h2.png') }
                        { this.renderBlockButton('numbered-list', '/static/inintoku/img/numberedlist.png') }
                        { this.renderBlockButton('bulleted-list', '/static/inintoku/img/unorderedlist.png') }
                    </div>
                }
                <Editor
                    ref={ this.ref }
                    value={ this.state.value }
                    onChange={ this.onChange }
                    onKeyDown={ this.onKeyDown }
                    renderBlock={ this.renderBlock }
                    renderMark={ this.renderMark }
                    readOnly={ renderToolBar === undefined ? true : false }
                />
            </div>
        )
    }

    renderMarkButton = (type, src) => {
        const isActive = this.hasMark(type)

        return (
            <div 
            className="inintoku-mark"
            onClick={ (event) => this.onClickMark(event, type) } >
                <Image className="inintoku-mark-icon" src={ src } />
            </div>
        )
    }

    renderBlockButton = (type, src) => {
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }

        return (
            <div 
                className="inintoku-mark"
                onClick={ (event) => this.onClickBlock(event, type) } >
                <Image className="inintoku-mark-icon" src={ src } />
            </div>
        )
    }

    renderBlock = (props, editor, next) => {
        const { attributes, children, node } = props

        switch (node.type) {
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            default:
                return next()
        }
    }

    renderMark = (props, editor, next) => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return next()
        }
    }

    onChange = ({ value }) => {
        const content = JSON.stringify(value.toJSON())
        localStorage.setItem('ap-content', content)
        this.setState({ value })
    }

    onKeyDown = (event, editor, next) => {
        let mark

        if (isBoldHotkey(event)) {
            mark = 'bold'
        } else if (isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return next()
        }

        event.preventDefault()
        editor.toggleMark(mark)
    }

    onClickMark = (event, type) => {
        event.preventDefault()
        this.editor.toggleMark(type)
    }

    onClickBlock = (event, type) => {
        event.preventDefault()

        const { editor } = this
        const { value } = editor
        const { document } = value

        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                editor
                .setBlocks(isActive ? DEFAULT_NODE : type)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                editor
                .setBlocks(DEFAULT_NODE)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
            } else if (isList) {
                editor
                .unwrapBlock(
                    type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                )
                .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }
    }
}


export default RichTextEditor