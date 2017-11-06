  myApp.controller('DemoCtrl', function($scope, Idle, Keepalive, $uibModal){
      $scope.started = false;

      function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }

      $scope.$on('IdleStart', function() {
        closeModals();

        $scope.warning = $uibModal.open({
          templateUrl: 'warning-dialog.html',
          windowClass: 'modal-danger'
        });
      });

      $scope.$on('IdleEnd', function() {
        closeModals();
      });

      $scope.$on('IdleTimeout', function() {
        closeModals();
        $scope.timedout = $uibModal.open({
          templateUrl: 'timedout-dialog.html',
          windowClass: 'modal-danger'
        });
        window.location = "login.html";
      });

      $scope.start = function() {
        closeModals();
        Idle.watch();
        $scope.started = true;
      };

      $scope.stop = function() {
        closeModals();
        Idle.unwatch();
        $scope.started = false;

      };
    })
    .config(function(IdleProvider, KeepaliveProvider) {
      IdleProvider.idle(600);
      IdleProvider.timeout(60);
      KeepaliveProvider.interval(10);
    });

    myApp.run(['Idle', function(Idle) {
      Idle.watch();
    }]);