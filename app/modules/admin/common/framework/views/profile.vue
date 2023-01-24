<script setup>
  defineProps({
    user: Object
  })
</script>

<template>
  <account-layout>
    <template v-slot:header>
      <app-page-hero
      :title="$t('menu.user.profile')"
      :sub-title="$t('menu.user.profile.subtitle')" />
    </template>
    <template v-slot:body>
      <div class="card">
        <div
          class="card-header bg-dark bg-img p-0 no-border"
          data-stellar-background-ratio="0.1"
          data-plugin="stellar"
        >
          <div class="bg-dark-overlay r-2x no-r-b">
            <div class="d-md-flex">
              <div class="p-4">
                <div class="d-flex">
                  <a href="#">
                    <span class="avatar w-64">
                      <!-- <img src="/user-m.png" alt="." /> -->
                      <i class="on"></i>
                    </span>
                  </a>
                  <div class="mx-3">
                    <h5 class="mt-2">{{ user.fullName }}</h5>
                    <div class="text-fade text-sm">
                      <span class="m-r">Senior Industrial Designer</span>
                      <small>
                        <i class="fa fa-map-marker mr-2"></i>London, UK</small
                      >
                    </div>
                  </div>
                </div>
              </div>
              <span class="flex"></span>
              <div class="align-items-center d-flex p-4">
                <div class="toolbar">
                  <a
                    href="#"
                    class="btn btn-sm btn-icon bg-dark-overlay btn-rounded"
                  >
                    <i
                      data-feather="phone"
                      width="12"
                      height="12"
                      class="text-fade"
                    ></i>
                  </a>
                  <a
                    href="#"
                    class="btn btn-sm btn-icon bg-dark-overlay btn-rounded"
                  >
                    <i
                      data-feather="more-vertical"
                      width="12"
                      height="12"
                      class="text-fade"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3">
          <div class="d-flex">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#"
                  data-toggle="tab"
                  data-target="#tab_4"
                  >Dados do perfil</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  data-toggle="tab"
                  data-target="#tab_2"
                  >Actividades</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-7 col-lg-8">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab_4">
              <div class="card">
                <div class="px-2">
                  <div class="py-3">
                    <ul class="nav flex-column">
                      <li class="nav-item">
                        <a class="nav-link">
                          <span>Califorlia</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link">
                          <span>320-654-123</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link">
                          <span>July 10</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link">
                          <span>garret@gmail.com</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="px-4 py-4">
                  <div class="row mb-2">
                    <div class="col-6">
                      <small class="text-muted">Cell Phone</small>
                      <div class="my-2">1243 0303 0333</div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">Family Phone</small>
                      <div class="my-2">+32(0) 3003 234 543</div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-6">
                      <small class="text-muted">Reporter</small>
                      <div class="my-2">Coch Jose</div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">Manager</small>
                      <div class="my-2">James Richo</div>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted">Bio</small>
                    <div class="my-2">
                      Ut maecenas sed purus ultrices sed sapien massa quam eu
                      sed odio id dui, sed sed lectus amet cursus sed habitant
                      est morbi adipiscing nam consectetur nullam urna, proin
                      condimentum ut laoreet congue felis, diam pulvinar aliquam
                      libero non tortor turpis aliquet massa eu etiam eget
                      quisque egestas tristique tempus purus blandit nunc
                      volutpat aliquam amet, aliquet nec et sed
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="tab_2">
              <div class="card p-4">
                <div class="timeline animates animates-fadeInUp">
                  <div class="tl-item active">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">Added to <a href="#">@TUT</a> team</div>
                      <div class="tl-date text-muted mt-1">2 days ago</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class=""><a href="#">@Netflix</a> hackathon</div>
                      <div class="tl-date text-muted mt-1">25/12 18</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        Just saw this on the <a href="#">@eBay</a> dashboard,
                        dude is an absolute unit.
                      </div>
                      <div class="tl-date text-muted mt-1">1 Week ago</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        Prepare the documentation for the
                        <a href="#">Fitness app</a>
                      </div>
                      <div class="tl-date text-muted mt-1">20 minutes ago</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        <a href="#">@NextUI</a> submit a ticket request
                      </div>
                      <div class="tl-date text-muted mt-1">1 hour ago</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        Developers of <a href="#">@iAI</a>, the AI assistant
                        based on Free Software
                      </div>
                      <div class="tl-date text-muted mt-1">1 day ago</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        <a href="#">@WordPress</a> How To Get Started With
                        WordPress
                      </div>
                      <div class="tl-date text-muted mt-1">20 minutes ago</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        From design to dashboard, <a href="#">@Dash</a> builds
                        custom hardware according to on-site requirements
                      </div>
                      <div class="tl-date text-muted mt-1">21 July</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        Fun project from this weekend. Both computer replicas
                        are fully functional
                      </div>
                      <div class="tl-date text-muted mt-1">03/12 18</div>
                    </div>
                  </div>
                  <div class="tl-item">
                    <div class="tl-dot"></div>
                    <div class="tl-content">
                      <div class="">
                        We help companies deliver reliable and beautiful
                        <a href="#">@IOSapps</a>
                      </div>
                      <div class="tl-date text-muted mt-1">13/12 18</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-5 col-lg-4">
          <div class="card sticky" style="z-index: 1">
            <div class="card-header">
              <strong> Pessoas do mesmo organismo </strong>
            </div>
            <div class="list list-row">
              <div class="list-item" data-id="17">
                <div>
                  <a href="#">
                    <span class="w-40 avatar gd-warning">
                      <span
                        class="avatar-status on b-white avatar-right"
                      ></span>
                      H
                    </span>
                  </a>
                </div>
                <div class="flex">
                  <a href="#" class="item-author text-color">Helen Valdez</a>
                  <a href="#" class="item-company text-muted h-1x"> AI </a>
                </div>
                <div>
                  <div class="item-action dropdown">
                    <a href="#" data-toggle="dropdown" class="text-muted">
                      <i data-feather="more-vertical"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right bg-black"
                      role="menu"
                    >
                      <a class="dropdown-item" href="#"> See detail </a>
                      <a class="dropdown-item download"> Download </a>
                      <a class="dropdown-item edit"> Edit </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item trash"> Delete item </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item" data-id="12">
                <div>
                  <a href="#">
                    <span class="w-40 avatar gd-info">
                      <span
                        class="avatar-status off b-white avatar-right"
                      ></span>
                      A
                    </span>
                  </a>
                </div>
                <div class="flex">
                  <a href="#" class="item-author text-color">Alan Richards</a>
                  <a href="#" class="item-company text-muted h-1x"> Drafty </a>
                </div>
                <div>
                  <div class="item-action dropdown">
                    <a href="#" data-toggle="dropdown" class="text-muted">
                      <i data-feather="more-vertical"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right bg-black"
                      role="menu"
                    >
                      <a class="dropdown-item" href="#"> See detail </a>
                      <a class="dropdown-item download"> Download </a>
                      <a class="dropdown-item edit"> Edit </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item trash"> Delete item </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item" data-id="14">
                <div>
                  <a href="#">
                    <span class="w-40 avatar gd-warning">
                      <span
                        class="avatar-status off b-white avatar-right"
                      ></span>
                      B
                    </span>
                  </a>
                </div>
                <div class="flex">
                  <a href="#" class="item-author text-color">Benjamin Fields</a>
                  <a href="#" class="item-company text-muted h-1x">
                    Luckman corp
                  </a>
                </div>
                <div>
                  <div class="item-action dropdown">
                    <a href="#" data-toggle="dropdown" class="text-muted">
                      <i data-feather="more-vertical"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right bg-black"
                      role="menu"
                    >
                      <a class="dropdown-item" href="#"> See detail </a>
                      <a class="dropdown-item download"> Download </a>
                      <a class="dropdown-item edit"> Edit </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item trash"> Delete item </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </account-layout>
</template>
