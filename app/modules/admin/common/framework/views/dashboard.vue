<template>
  <account-layout>
    <div>
      <app-page-hero
        title="Dashboard"
        :sub-title="'Bem vindo de volta, ' + $page.props.user.fullName"
      >
        <div class="flex"></div>
        <div class="refresh-dashboard-timer mr-2">
          <select class="form-control">
            <option>Dashboard: Layout 1</option>
          </select>
        </div>
        <div class="refresh-dashboard-timeer">
          <select class="form-control">
            <option>5sec</option>
            <option>5min</option>
            <option>10min</option>
            <option>30min</option>
            <option>1h</option>
          </select>
        </div>
      </app-page-hero>

      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row" data-plugin="chartist">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <strong>World Map</strong>
                </div>
                <div class="row no-gutters">
                  <div class="col-sm-6">
                    <div class="p-4">
                      <div
                        id="jqvmap-world"
                        data-plugin="vectorMap"
                        style="height: 240px"
                        class="d-flex align-items-center justify-content-center"
                      >
                        <div class="loading"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3 p-4">
                    <div class="">
                      <div class="my-2">
                        <small class="text-muted"> North America </small>
                        <div class="progress no-bg align-items-center mt-2 circle">
                          <div class="progress-bar bg-primary" style="width: 45%"></div>
                          <span class="ml-2 text-muted">45%</span>
                        </div>
                      </div>
                      <div class="my-2">
                        <small class="text-muted"> Europe </small>
                        <div class="progress no-bg align-items-center mt-2 circle">
                          <div class="progress-bar bg-success" style="width: 25%"></div>
                          <span class="ml-2 text-muted">30%</span>
                        </div>
                      </div>
                      <div class="my-2">
                        <small class="text-muted"> Asia </small>
                        <div class="progress no-bg align-items-center mt-2 circle">
                          <div class="progress-bar bg-info" style="width: 10%"></div>
                          <span class="ml-2 text-muted">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3 b-l">
                    <div class="p-4 text-center b-b">
                      <h3 class="m-0">Asia</h3>
                    </div>
                    <div class="p-4 row text-center">
                      <div class="col b-r">
                        1200
                        <div class="text-muted text-sm">Cities</div>
                      </div>
                      <div class="col">
                        350,000
                        <div class="text-muted text-sm">Population</div>
                      </div>
                    </div>
                    <div class="p-4 text-center text-center">
                      <span class="text-md text-primary">65%</span>
                      <div class="text-muted text-sm">Profit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">Bar chart</div>
                <div class="card-body">
                  <div id="chartist-bar" class="pos-rlt" style="height: 240px"></div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">Horizental bar chart</div>
                <div class="card-body">
                  <div id="chartist-h-bar" class="pos-rlt" style="height: 240px"></div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">Pie chart</div>
                <div class="card-body">
                  <div id="chartist-pie" class="pos-rlt" style="height: 240px"></div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">Dougnut chart</div>
                <div class="card-body">
                  <div id="chartist-dougnut" class="pos-rlt" style="height: 240px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </account-layout>
</template>
<script>
  export default {
    props: {
      errors: Object
    }
  }
</script>
