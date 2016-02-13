VAGRANTFILE_API_VERSION = "2"

box             = 'bento/centos-6.7'
hostname        = 'ttools.local'
ram             = '768'

developer_settings = <<SCRIPT
  curl http://jcotton1123.github.io/bootstrapmyenv/essentials.sh | bash
  su - vagrant -c "curl http://jcotton1123.github.io/bootstrapmyenv/essentials.sh | bash"
SCRIPT

bootstrap_script = <<SCRIPT
  yum update -y

  yum install -y httpd
  rm -rf /var/www/html
  ln -s /vagrant /var/www/html
  chkconfig --level 2345 httpd on
  service httpd restart

  iptables -F
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = box
  config.vm.host_name = hostname
  config.vm.network "public_network"
  config.ssh.forward_agent = true

  config.vm.provider "virtualbox" do |v|
    v.name = hostname
    v.memory = ram
  end

  config.vm.provision "shell", inline: bootstrap_script
  config.vm.provision "shell", inline: developer_settings
end
