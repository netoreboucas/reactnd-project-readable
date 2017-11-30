import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import { addPost } from '../actions'

class AddPostModal extends Component {
  state = {
    open: false,
    title: '',
    author: '',
    category: '',
    body: ''
  }

  show = () => this.setState({
    open: true,
    category: this.props.selectedCategory || this.props.categories[0].value
  })

  hide = () => this.setState({
    open: false,
    title: '',
    author: '',
    category: '',
    body: ''
  })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { title, author, category, body } = this.state

    this.props.addPost({
      title,
      author,
      category,
      body
    }).then((data) => {
      this.hide()
      this.props.history.push(`/${category}/${data.result}`)
    })
  }

  render () {
    const { open, title, author, category, body } = this.state
    const { categories } = this.props

    return (
      <Modal trigger={<Button id="btnCreatePost" primary fluid onClick={this.show}>Create new post</Button>} open={open}>
        <Header icon="archive" content="Create new post" />
        <Modal.Content>
          <Form id="createForm" onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input label="Title" placeholder="What's the post title?" name="title" value={title} onChange={this.handleChange} required />
              <Form.Input label="Author" placeholder="What's your name?" name="author" value={author} onChange={this.handleChange} required />
              <Form.Select label="Category" options={categories} name="category" value={category} onChange={this.handleChange} />
            </Form.Group>
            <Form.TextArea label="Text" placeholder="Write here your post text..." name="body" value={body} onChange={this.handleChange} required />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.hide}>Cancel</Button>
          <Button positive type="submit" form="createForm">Save</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

AddPostModal.propTypes = {
  categories: PropTypes.array,
  selectedCategory: PropTypes.string,
  addPost: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = ({ categories }) => ({
  categories: categories && categories.loaded
    ? categories.keys.reduce((result, id) => {
      const category = categories.values[id]
      result.push({
        key: category.path,
        text: category.path,
        value: category.name
      })
      return result
    }, [])
    : null,
  selectedCategory: categories && categories.loaded ? categories.selectedCategory : null
})

const mapDispatchToProps = {
  addPost
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPostModal))
