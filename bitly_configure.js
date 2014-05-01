Template.configureLoginServiceDialogForBitly.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForBitly.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'}
  ];
};
