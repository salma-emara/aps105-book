document.write(`<head>
  <!-- Font Awesome -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    rel="stylesheet"
  />
  <!-- Google Fonts -->
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    rel="stylesheet"
  />
  <!-- MDB -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.3.2/mdb.min.css"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="chatbot_styles.css" />
  <script src="chatbot_actions.js"></script>

  <script type="module" src="https://md-block.verou.me/md-block.js"></script>
</head>

<body>
  <script
    type="text/javascript"
    src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.3.2/mdb.umd.min.js"
  ></script>
  <section>
    <div class="float-chat-container hide" id="chat-box" style="height: auto">
      <div class="row d-flex">
        <div class="col-md-8 col-lg-6 col-xl-4" style="width: 100%">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">Bot</h5>
              <div class="d-flex flex-row align-items-center">
                <button
                  class="btn-minus"
                  title="Clear Chat"
                  onclick="clearChat()"
                >
                  <i class="fa fa-trash"></i>
                </button>
                <button
                  class="btn-minus"
                  title="Minimize Chat"
                  onclick="hideChat()"
                >
                  <i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <div
              class="card-body me-0"
              data-mdb-perfect-scrollbar-init
              style="position: relative"
              id="chat"
            ></div>
            <div
              class="card-footer text-muted d-flex justify-content-start align-items-center p-3"
            >
              <div class="input-group mb-0">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Type Your Question Here"
                  id="userInput"
                  style="overflow: hidden"
                ></textarea>
                <button
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="btn btn-primary"
                  type="button"
                  id="btn-submit"
                  style="padding-top: 0.55rem"
                  onclick="submit()"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="float-btn-container">
      <button
        type="button"
        class="btn btn-primary btn-floating btn-lg"
        data-mdb-ripple-init
        onclick="showChat()"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </section>
</body>
`);
