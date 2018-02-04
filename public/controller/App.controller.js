sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageBox'],
  function(Controller, JSONModel, MessageBox) {
    'use strict';
    return Controller.extend('io.nlsltz.ui5con.watcher.controller.App', {
      epochToDate: function(sTimestamp) {
        return new Date(sTimestamp);
      },

      onInit: function() {
        this.oModel = new JSONModel();
        this.getView().setModel(this.oModel);
        this._fetchData();

        const that = this;
        let timerId = setTimeout(
          function tick() {
            this._fetchData();
            this._determineRegistrationStatusStyle();

            timerId = setTimeout(tick.bind(this), 5 * 60 * 1000 /* 5 minute intervall */);
          }.bind(this),
          60000 /* 5 minute intervall */
        );
      },

      handleRefreshPress: function(oEvent) {
        this._fetchData();
        this._determineRegistrationStatusStyle();
      },

      _determineRegistrationStatusStyle: function() {
        const oStatusText = this.byId('statusText');
        const sRegistrationStatus = this.oModel.getProperty('/registrationStatus');
        if (sRegistrationStatus === 'not open') {
          oStatusText.removeStyleClass('greenText');
          oStatusText.addStyleClass('redText');
        } else if (sRegistrationStatus === 'open') {
          oStatusText.removeStyleClass('redText');
          oStatusText.addStyleClass('greenText');
        }
      },

      _fetchData: function() {
        var that = this;
        this.getView().setBusy(true);
        fetch('/api/v1/checkRegistration')
          .then(function(res) {
            if (!res.ok) {
              throw new Error('HTTP Error: ' + res.statusText);
            }
            return res.json();
          })
          .then(
            function(data) {
              that.getView().setBusy(false);
              that.oModel.setData(data);
            },
            function(error) {
              that.getView().setBusy(false);
              jQuery.sap.log.error(error);
              MessageBox.alert('Unexpected error: ' + error.message);
            }
          );
      }
    });
  }
);
