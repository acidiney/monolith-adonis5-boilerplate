<template>
  <account-layout>
    <div>
      <div class="b-b">
        <div class="d-flex padding">
          <div>
            <h2 class="text-md text-highlight">Agendamentos</h2>
            <small class="text-muted">{{ $page.props.today }}</small>
            <a class="badge badge-sm badge-pill b-a mx-1" id="todayview">Hoje</a>
          </div>
        </div>
        <div class="nav-active-border b-success px-3">
          <ul class="nav text-sm" role="tablist">
            <li class="nav-item">
              <a class="nav-link" id="dayview" data-toggle="tab">Diário</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" id="weekview" data-toggle="tab">Semanal</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="monthview" data-toggle="tab">Mensal</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- modal -->
      <div id="newEvent" class="modal fade">
        <div class="modal-dialog text-dark">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-white">Event</h5>
              <button class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Title</label>
                  <div class="col-sm-9">
                    <input id="event-title" type="text" class="form-control" placeholder="Title" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Event type</label>
                  <div class="col-sm-9">
                    <div class="mt-2" id="event-type">
                      <div class="form-check form-check-inline">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="type"
                            value="Appointment"
                          />
                          Appointment</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="type"
                            value="Meeting"
                          />
                          Meeting</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row row-sm">
                  <label class="col-sm-3 col-form-label">Start</label>
                  <div class="col-sm-5">
                    <input
                      id="event-start-date"
                      type="date"
                      class="form-control"
                      placeholder="Date"
                    />
                  </div>
                  <div class="col-sm-4">
                    <input
                      id="event-start-time"
                      type="time"
                      class="form-control"
                      placeholder="Time"
                    />
                  </div>
                </div>
                <div class="form-group row row-sm">
                  <label class="col-sm-3 col-form-label">End</label>
                  <div class="col-sm-5">
                    <input
                      id="event-end-date"
                      type="date"
                      class="form-control"
                      placeholder="Date"
                    />
                  </div>
                  <div class="col-sm-4">
                    <input
                      id="event-end-time"
                      type="time"
                      class="form-control"
                      placeholder="Time"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Participate</label>
                  <div class="col-sm-9">
                    <div class="d-flex">
                      <div id="event-participant" class="avatar-group">
                        <a href="#" class="avatar w-32 b-a b-white">
                          <img src="/vendor/img/a0.jpg" />
                        </a>
                        <a href="#" class="avatar w-32 b-a b-white">
                          <img src="/vendor/img/a2.jpg" />
                        </a>
                        <a href="#" class="avatar w-32 b-a b-white">
                          <img src="/vendor/img/a3.jpg" />
                        </a>
                        <a href="#" class="avatar w-32 b-a b-white">
                          <img src="/vendor/img/a4.jpg" />
                        </a>
                        <a href="#" class="avatar w-32 b-a b-white">
                          <img src="/vendor/img/a5.jpg" />
                        </a>
                      </div>
                      <a href="#" class="btn btn-icon btn-rounded btn-primary ml-1">
                        <i data-feather="plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Description</label>
                  <div class="col-sm-9">
                    <textarea id="event-desc" class="form-control" rows="6"></textarea>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3"></label>
                  <div class="col-sm-9">
                    <button
                      type="button"
                      id="btn-save"
                      class="btn gd-primary text-white btn-rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
      </div>
      <!-- / .modal -->
      <div id="fullcalendar" data-plugin="fullCalendar">
        <div class="loading m-4"></div>
      </div>
    </div>
  </account-layout>
</template>
