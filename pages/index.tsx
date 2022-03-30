import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import Layout from "../components/layout"

const CREATE_USER = gql`
  mutation Mutation {
    createTask {
      id
      name
      email
      image
    }
  }
`

const CREATE_TASK = gql`
  mutation Mutation($title: String, $description: String, $status: String) {
    taskCreate(title: $title, description: $description, status: $status) {
      id
      title
      status
      description
      userId
    }
  }
`

export default function IndexPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [createTask, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      alert("User created ")
    },
    onError: (error) => {
      alert(`Error: ${error}`)
    },
  })
  const [taskCreate, { loading: taskcreateLoading, error: taskCreateError }] =
    useMutation(CREATE_TASK, {
      onCompleted: (data) => {
        alert("Task created ")
      },
      onError: (error) => {
        alert(`Error: ${error}`)
      },
    })
  const handleSubmit = (e: any) => {
    e.preventDefault()

    taskCreate({
      variables: {
        title,
        description,
        status,
      },
    })
  }
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
      <button onClick={() => createTask()}>
        {loading ? <span>creating....</span> : <span>create user</span>}
      </button>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          type="text"
        />
        <input
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
          type="text"
        />
        <button type="submit">
          {taskcreateLoading ? (
            <span>creating task...</span>
          ) : (
            <span>crete task</span>
          )}
        </button>
      </form>
    </Layout>
  )
}
