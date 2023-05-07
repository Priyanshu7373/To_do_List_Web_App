const App = () => {
  // console.log('loded');
  const [input, setInput] = React.useState([]);
  const [form, setForm] = React.useState({
    data: '',
  });
  React.useEffect(() => {
    fetchData();
  }, [])
  function fetchData() {
    fetch('/api/notes')
      .then((res) => res.json())
      .then(data => {
        setInput(data);
        // console.log({input});
      })
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.data) {
      return;
    }

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        fetchData();
        // setForm({ name: ''});
      })
  }
  function updateForm(event, field) {
    if (field === 'data') {
      setForm({
        ...form,
        data: event.target.value
      });
    }
  }
  const deleteNotes = (notesId) => {
    fetch(`/api/notes/${notesId}`, {
      method: 'DELETE' // PUT , PATCH
    }).then((res) => res.json())
      .then((data) => {
        fetchData();
        console.log(data)
      });
  }
  return (
    <>
      <div className="card" style={{
        width: '50%', textAlign: 'center', borderRadius: '30px', backgroundColor: '#8EC5FC',
        backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',

      }}>
        <div className="card-header">
          <p>

            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{ color: 'black', background: 'white', border: 'none', position: "relative", top: '10px', }}>
              Click to Add Notes
            </button>
          </p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body" style={{
              alignItems: 'center'
            }}>
              <form >
                <input style={{ border: 'none', width: '100%', padding: '7px', margin: '0px', borderBottom: 'cornflowerblue 1px solid', }} value={form.data} onChange={() => updateForm(event, 'data')} />
                <button type="submit" style={{ border: 'none', width: '25%', padding: '0px', margin: '0px', marginTop: '15px' }} onClick={handleSubmit}>Add It</button>
              </form>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush" style={{ borderRadius: '30px', }}>


          {
            input.map((item) => {
              return (
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                  <li className="list-group-item" style={{ width: '100%' }} key={item.id}>{item.data}</li>
                  <button style={{ border: 'none', background: "inherit" }} onClick={() => deleteNotes(item.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg></button>
                </div>
              )
            })
          }

        </ul>
      </div >
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('cpp'));