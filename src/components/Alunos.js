import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

class Alunos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alunos: [
                { id: 1, nome: 'Davi', email: "okaychamp@tw.com" },
                { id: 2, nome: 'Marcos', email: "okaiychamp@tw.com" }
            ],
            email: '',
            nome: '',
        }
        this.deletarAluno = this.deletarAluno.bind(this);
        this.buscarAluno = this.buscarAluno.bind(this);
        this.setNome= this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

    componentDidMount() {
        this.buscarAluno();
    }

    componentWillUnmount() {
        console.log('desmontou')
    }
    setNome(e){
        this.setState({nome: e.target.value})
    }
    setEmail(e){
        this.setState({email: e.target.value})
    }

    buscarAluno() {
        fetch('http://localhost:5000/alunos')
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ alunos: dados })
            })
    }

    deletarAluno(id) {
        fetch(`http://localhost:5000/alunos/${id}`, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                }
            })
    }

    renderTabela() {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.alunos.map((aluno) =>
                            <tr key={aluno.id.toString()}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>Atualizar  <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>{' '}</td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        )

    }

    cadastrarForm() {
        return(
           <Form>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome do Aluno"  value={this.state.nome} onChange={this.setNome}/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Coloque o email"  value={this.state.email} onChange={this.setEmail} />
                <Form.Text className="text-muted">
                   Utilize o seu melhor e-mail do aluno.
                </Form.Text>
            </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit">
                Salvar
            </Button>
        </Form>
        )

    }

    render() {
        return (
            <div>
                {this.cadastrarForm()}
                {this.renderTabela()}
            </div>
        )
    }


}

export default Alunos;